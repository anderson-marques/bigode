'use strict'

const glob = require('glob')
const Mustache = require('mustache')

const {
    existsSync,
    lstatSync,
    mkdirSync,
    readFileSync,
    writeFile,
} = require('fs')

const {
    dirname,
    resolve,
} = require('path')


/**
 * Creates the processing list.
 *
 * @param {string[]} files - File path of files present in the template project
 * @param {string} templatePath - The template project's source folder path
 * @param {string} projectName - The name of the project to be created
 */
const createProcessingList = (files, templatePath, projectName) => {
    return files.map( filePath => {
        // Check if the file is a directory
        const isDirectory = lstatSync(filePath).isDirectory()
        // The source is the current file path
        const source = filePath
        // The destination is the replacement of the current templatePath to the project name folder
        const destination = source.replace(templatePath, resolve(`./${projectName}`))

        return {
            isDirectory,
            source,
            destination
        }
    })
}

/**
 * List all files and subfolders inside of a directory
 *
 * @param {string} directoryPath - directory path to list all files and subfolders
 */
const listFilesInDirectory = async directoryPath => {
    _validateDirectoryPath(directoryPath)
    return new Promise((resolve, reject) =>  {
        glob(`${directoryPath}/**/***`, (err, files) => err ? reject(err) : resolve(files))
    })
}

/**
 * Process a file template generating it rendered content
 *
 * @param {Object} fileToProcess - Object containing attrs: isDirectory, source, destination
 * @param {*} context
 */
const processFile = (fileToProcess, context) =>  {
    return new Promise((resolve, reject)=> {
         // Try to create the destination folder/subfolder before write the file
         try {
             mkdirSync(dirname(fileToProcess.destination), { recursive: true } );
         } catch (e) {
             console.log('Cannot create folder ', e);
         }

         // In case the file is not a directory the Mustache will render its content
         if (!fileToProcess.isDirectory) {
             // Reads the template content from the source
             const templateContent = readFileSync(fileToProcess.source,'utf-8')

             // Produces the rendered file content
             const renderedFile = Mustache.render(templateContent, context)

             // Write the rendered file in the destination folder
             writeFile(fileToProcess.destination, renderedFile, err => err ? reject(err) : resolve() )
         }
    })
 }

/**
 * Reads a context file path, throws a an
 * @param {string} filePath - Absolute path or the context file
 * @throws {Error} FILE_NOT_FOUND
 * @throws {Error} NOT_A_JSON_FILE
 * @throws {Error} INVALID_CONTENT
 */
const readContextFile = filePath => {
    // Validate the context file
    _validateContextFile(filePath)

    // Return its content in JSON format. Throws error if couldn't
    try {
        return JSON.parse(readFileSync(filePath, { encoding: 'utf-8'}))
    } catch (error) {
        throw new Error(`Context file "${filePath}" content is invalid. It is not a valid JSON!`)
    }
}

/**
 * Checks if a path exists
 * @param {string} path - Path to check
 */
const _pathExists = path => {
    try {
        return existsSync(path)
    } catch (err) {
        return false
    }
}

/**
 * Validates if a filePath contains a directory or not.
 * @param {string} filePath - File path to check
 */
const _validateDirectoryPath = filePath => {
    if (!_pathExists(filePath)) throw new Error(`Diretory "${filePath}" not found!`)
    if (!lstatSync(filePath).isDirectory()) throw new Error(`File "${filePath}" is not a directory!`)
}

/**
 * Validate the context file. It it exists and if it is a valid JSON
 *
 * @param {string} filePath - Context File's path
 * @throws {Error} FILE_NOT_FOUND
 * @throws {Error} NOT_A_JSON_FILE
 */
const _validateContextFile = filePath => {
    if (!_pathExists(filePath)) throw new Error(`Context file "${filePath}" not found!`)

    if (!filePath.toLowerCase().endsWith('.json')) {
        throw new Error(`Context file "${filePath}" is not a json file!`)
    }
}

module.exports = { createProcessingList, listFilesInDirectory, processFile, readContextFile, _pathExists, _validateDirectoryPath, _validateContextFile }
