const {
  pathExists,
  getPathStats,
  validateDirectoryPath,
  listFilesInDirectory,
  createProcessingList,
  processDiretory,
  processTemplate,
 } = require('./pug-generator-services')

describe('pug-generator-services unit tests', function (){

  const EXAMPLE_TEMPLATE_DIRECTORY = './__test__/example-template'
  const FAKE_TEMPLATE_DIRECTORY = './__test__/fake-template'
  const SIMPLE_FILE = './__test__/simple-file.txt'

  test('expect pathExists to be defined', () => {
    expect(pathExists).toBeDefined()
  })

  test('expect getPathStats to be defined', () => {
    expect(getPathStats).toBeDefined()
  })

  test('expect validateDirectoryPath to be defined', () => {
    expect(validateDirectoryPath).toBeDefined()
  })

  test('expect listFilesInDirectory to be defined', () => {
    expect(listFilesInDirectory).toBeDefined()
  })

  test('expect createProcessingList to be defined', () => {
    expect(createProcessingList).toBeDefined()
  })

  test('expect processDiretory to be defined', () => {
    expect(processDiretory).toBeDefined()
  })

  test('expect processTemplate to be defined', () => {
    expect(processTemplate).toBeDefined()
  })

  test('expect example-template path to exist', () => {
    return expect(pathExists(EXAMPLE_TEMPLATE_DIRECTORY)).resolves.toBe(true)
  })

  test('expect fake-template path to not exist', () => {
    return expect(pathExists(FAKE_TEMPLATE_DIRECTORY)).resolves.toBe(false)
  })

  test('expect validateDirectoryPath with fake-template to raise error', () => {
    return expect(validateDirectoryPath(FAKE_TEMPLATE_DIRECTORY)).rejects.toThrow('Diretory \"./__test__/fake-template\" not found!')
  })

  test('expect validateDirectoryPath with simple-file.txt to raise error', () => {
    return expect(validateDirectoryPath(SIMPLE_FILE)).rejects.toThrow('File \"./__test__/simple-file.txt\" is not a directory!')
  })

  test('expect listFilesInDirectory to have 5 itens', () => {
    return expect(listFilesInDirectory(EXAMPLE_TEMPLATE_DIRECTORY)).resolves.toHaveLength(6)
  })

  test('expect listFilesInDirectory to contain file.json.pug', () => {
    return expect(listFilesInDirectory(EXAMPLE_TEMPLATE_DIRECTORY)).resolves.toContain(`${EXAMPLE_TEMPLATE_DIRECTORY}\/file.json.pug`)
  })

})
