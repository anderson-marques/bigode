const fs = require('fs')
const pug = require('pug')
const path = require('path')
var glob = require("glob")

async function main() {
    // TODO: Add commander to create a CLI and pkg to distribute this project as a homebrew package
    const projectName = 'my-awesome-project'
    const templatePath = './template'
    const context = {
        "name": "anderson"
    }

    await validateTemplatePath(templatePath)

    const files = await listFilesInDirectory(templatePath)

    const processingList = files.map((filePath)=>{
        const isDirectory = fs.lstatSync(filePath).isDirectory()
        const source = filePath
        const sourceWithPugExtension = filePath.endsWith('.pug') ? filePath.slice(0, -4): filePath
        const destination = sourceWithPugExtension.replace(templatePath, `./${projectName}`)
        return { isDirectory, source, destination }
    })

    const directories = processingList.filter(item => item.isDirectory)
    const templates = processingList.filter(item => !item.isDirectory)

    // Process first the diretories
    await processDiretories(directories)

    // Once the diretories were created, we can start processing the template files
    await processTemplates(templates, context)
}

async function validateTemplatePath(templatePath) {
    const pathExists = await templatePathExists(templatePath)

    if (!pathExists) {
        throw new Error(`Template folder "${templatePath}" not found!`)
    }

    let templatePathStats = await getPathStats(templatePath)

    if (!templatePathStats.isDirectory()) {
        throw new Error(`Template "${templatePath}" is not a directory!`)
    }
}

function getPathStats(path) {
    return new Promise((resolve, reject)=>{
        fs.lstat(path, (err, stats) => {
            if (err) {
                return reject(err)
            }
            return resolve(stats)
        })
    })
}

function templatePathExists(path) {
    return new Promise((resolve, _)=>{
        fs.exists(path, (exists) => {
            return resolve(exists)
        })
    })
}

function listFilesInDirectory(directoryPath) {
    return new Promise((resolve, reject)=>{
        glob(`${directoryPath}/**/***`, (err, files) => {
            if (err) {
                return reject(err)
            }
            return resolve(files)
        })
    })
}

function processDiretories(directories) {
    return new Promise((resolve, reject)=> {
        directories.forEach(diretory => {
            fs.mkdirSync(diretory.destination, { recursive: true}, (err)=> {
                return reject(err)
            })
        })
        return resolve()
    })
}

function processTemplates(templates, context) {
    templates.forEach((template)=>{
        copyFromTemplateToDestination(template.source, template.destination, context)
    })
}

function copyFromTemplateToDestination(source, destination, context) {
    //  console.log(`\ncopyFromTemplateToDestination called with source=${source}, destination=${destination}, context=${JSON.stringify(context)}`)
    const templateResult = pug.compileFile(source)(context)
    fs.writeFile(destination, templateResult, (err) => {
        if (err) console.error('Failure generating file from ${source} to ${destination}', err)
    })
}

function isTemplate(filePath) {
    return filePath && filePath.endsWith('.pug')
}

main().catch(err => console.log(err.message))
