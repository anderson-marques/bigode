const fs = require('fs')
const pug = require('pug')
var glob = require("glob")

const createProcessingList = (files, templatePath, projectName) => {
    return files.map( filePath => {
        const isDirectory = fs.lstatSync(filePath).isDirectory()
        const source = filePath
        const sourceWithPugExtension = filePath.endsWith('.pug') ? filePath.slice(0, -4): filePath
        const destination = sourceWithPugExtension.replace(templatePath, `./${projectName}`)

        return { isDirectory, source, destination }
    })
}

const pathExists = path => {
    return new Promise(resolve => {
        try {
            fs.exists(path, exists => resolve(exists))
        } catch (err) {
            return resolve(false)
        }
    })
}

const getPathStats = path => new Promise( (resolve, reject) => fs.lstat(path, (err, stats) => err ? reject(err) : resolve(stats)))

const validateDirectoryPath = async filePath => {
    if (!await pathExists(filePath)) throw new Error(`Diretory "${filePath}" not found!`)
    if (!(await getPathStats(filePath)).isDirectory()) throw new Error(`File "${filePath}" is not a directory!`)
}

const validateContextFile = async filePath => {
    if (!await pathExists(filePath)) throw new Error(`Context file "${filePath}" not found!`)

    if (!filePath.toLowerCase().endsWith('.json')) {
        throw new Error(`Context file "${filePath}" is not a json file!`)
    }
}

const getContextFile = async filePath => {
    validateContextFile(filePath)

    try {
        return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8'}))
    } catch (error) {
        throw new Error(`Context file "${filePath}" content is invalid. It is not a valid JSON!`)
    }
}

const listFilesInDirectory = async directoryPath => {
    await validateDirectoryPath(directoryPath)
    return new Promise((resolve, reject) =>  {
        glob(`${directoryPath}/**/***`, (err, files) => err ? reject(err) : resolve(files))
    })
}

const processDiretory = directory => fs.mkdirSync(directory.destination, { recursive: true }, err => { throw err } )

const processTemplate = (source, destination, context) => fs.writeFileSync(destination, pug.compileFile(source)(context))

module.exports = {
    pathExists,
    getPathStats,
    validateDirectoryPath,
    listFilesInDirectory,
    createProcessingList,
    processDiretory,
    processTemplate,
    getContextFile
}
