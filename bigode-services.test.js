const {
  _pathExists,
  _validateDirectoryPath,
  _validateContextFile,
  listFilesInDirectory,
  createProcessingList,
  processFile,
  readContextFile,
 } = require('./bigode-services')

describe('bigode-services unit tests', function (){

  const EXAMPLE_TEMPLATE_DIRECTORY = './__test__/example-template'
  const FAKE_TEMPLATE_DIRECTORY = './__test__/fake-template'
  const SIMPLE_FILE = './__test__/simple-file.txt'

  test('expect _validateDirectoryPath to be defined', () => {
    expect(_validateDirectoryPath).toBeDefined()
  })

  test('expect _validateContextFile to be defined', () => {
    expect(_validateContextFile).toBeDefined()
  })

  test('expect listFilesInDirectory to be defined', () => {
    expect(listFilesInDirectory).toBeDefined()
  })

  test('expect createProcessingList to be defined', () => {
    expect(createProcessingList).toBeDefined()
  })

  test('expect processFile to be defined', () => {
    expect(processFile).toBeDefined()
  })

  test('expect readContextFile to be defined', () => {
    expect(readContextFile).toBeDefined()
  })

  test('expect example-template path to exist', () => {
    expect(_pathExists(EXAMPLE_TEMPLATE_DIRECTORY)).toBe(true)
  })

  test('expect fake-template path to not exist', () => {
    expect(_pathExists(FAKE_TEMPLATE_DIRECTORY)).toBe(false)
  })

  test('expect _validateDirectoryPath with fake-template to raise error', () => {
    try {
      _validateDirectoryPath(FAKE_TEMPLATE_DIRECTORY)
    } catch (error) {
      expect(error.message).toMatch('Diretory \"./__test__/fake-template\" not found!')
    }
  })

  test('expect _validateDirectoryPath with simple-file.txt to raise error', () => {
    try {
      _validateDirectoryPath(SIMPLE_FILE)
    } catch (error) {
      expect(error.message).toMatch('File \"./__test__/simple-file.txt\" is not a directory!')
    }

  })

  test('expect listFilesInDirectory to have 5 itens', () => {
    return expect(listFilesInDirectory(EXAMPLE_TEMPLATE_DIRECTORY)).resolves.toHaveLength(7)
  })

  test('expect listFilesInDirectory to contain file.json.pug', () => {
    return expect(listFilesInDirectory(EXAMPLE_TEMPLATE_DIRECTORY)).resolves.toContain(`${EXAMPLE_TEMPLATE_DIRECTORY}\/file.json`)
  })

})
