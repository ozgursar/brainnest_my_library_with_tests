import Storage from '../storage'

const testLibrary = [{
  title: "Test Title",
  author: "Test Author",
  pages: "10",
  language: "English",
  publishDate: "2022-01-03T22:35:20.413Z",
  isreadradio: false,
  dateOfAdd: "2023-03-03T22:35:20.413Z",
}]

jest.mock('../ui.js')
jest.mock('../progress-bar')

test('Returns empty array of books when local storage is not set', () => {
  return Storage.getBooks().then(data => {
    expect(data.length).toBe(0)
  })
})

test('Updates local storage correctly', () => {
  return Storage.setBooks(testLibrary).then(data => {
    expect(JSON.parse(localStorage.getItem('myLibrary'))).toEqual(testLibrary)
  })
})

test('Returns array of books when local storage is set', () => {
  return Storage.getBooks().then(data => {
    expect(data).toEqual(testLibrary)
  })
})