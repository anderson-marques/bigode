const fs = require('fs')
const pug = require('pug')
const path = require('path')

const main = () => {
    const context = { name: 'anderson' }

    // Inform all files you want to process
    const files = {
        './template/file.json.pug': "./file.json",
        './template/index.html': "./index.html"
    }

    processFiles(files, context)
}

function processFiles(files, context) {
    Object.entries(files).forEach(([source, destination]) => {
        console.log(`Copying ${source} to ${destination}...`)

        real_path_to_source = path.resolve(__dirname, source)
        console.log('__dirname', __dirname)
        console.log('real_path_to_source', real_path_to_source)

        copyFromTemplateToDestination(real_path_to_source, destination, context)
    })
}

function copyFromTemplateToDestination(source, destination, context) {
    let templateResult = pug.compileFile(source)(context)
    fs.writeFile(destination, templateResult, (err) => {
        if (err) console.error('Failure generating file from ${source} to ${destination}', err)
    })
}

function isTemplate(filePath) {
    return filePath && filePath.endsWith('.pug')
}

main()