'use strict'

const { program } = require('commander')

process.setMaxListeners(0)

const {
  validateTemplatePath,
  listFilesInDirectory,
  createProcessingList,
  processDiretory,
  processTemplate,
  getContextFile,
 } = require('./pug-generator-services')

 async function main() {

  program
    .version('1.0.0')
    .description('Generates a new project from a template-project using pug and a context file.')
    .requiredOption('-p, --project-name <projectName>', 'Project name')
    .requiredOption('-t, --template-project <templateProjectPath>', 'Template project folder')
    .requiredOption('-c, --context-file <contextFilePath>', 'JSON File containing the context for template replacement')
    .parse(process.argv);

  const projectName = program.projectName.endsWith('/') ? program.projectName.slice(0,-1) : program.projectName
  const templatePath = program.templateProject.endsWith('/') ? program.templateProject.slice(0,-1) : program.templateProject
  const contextPath = program.contextFile.endsWith('/') ? program.contextFile.slice(0,-1) : program.contextFile

  const context = await getContextFile(contextPath)

  const files = await listFilesInDirectory(templatePath)

  const processingList = createProcessingList(files, templatePath, projectName)

  processingList
      .filter(item => item.isDirectory)
      .map(directory => processDiretory(directory))

  processingList
      .filter(item => !item.isDirectory)
      .map(template => processTemplate(template.source, template.destination, context) )
}

main().catch(err => console.log(err))
