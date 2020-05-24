'use strict'

const { resolve } = require('path')
const { program } = require('commander')

process.setMaxListeners(0)

const {
  createProcessingList,
  listFilesInDirectory,
  processFile,
  readContextFile,
 } = require('./bigode-services')

 async function main() {
  // Creates a CLI Tool using commander
  program
    .version('1.0.0')
    .description('Bigode is a CLI generator tool that takes a projectName, a templateFolder embeded with Mustache tags, and a context file in format JSON and generates a new project.')
    .requiredOption('-p, --project-name <projectName>', 'Project name')
    .requiredOption('-t, --template-project <templateProjectPath>', 'Template project folder')
    .requiredOption('-c, --context-file <contextFilePath>', 'JSON File containing the context for template replacement')
    .parse(process.argv);

  // Gets the project name and remove the ending slash bar
  const projectName = program.projectName.endsWith('/') ? program.projectName.slice(0,-1) : program.projectName

  // Gets the absolute path of the given template project folder
  const templatePath = resolve(program.templateProject)

  // Gets the absolute path of the given context file
  const contextPath = resolve(program.contextFile)

  // Validates and read the context file content
  const context = await readContextFile(contextPath)

  // Obtain a list of all files in the template directory
  const files = await listFilesInDirectory(templatePath)

  // Generates a list of objects for processing with: isDirectory, source, destination
  const processingList = createProcessingList(files, templatePath, projectName)

  processingList.forEach(fileToProcess => {
    processFile(fileToProcess, context)
  })
}

main().catch(err => console.log(err))
