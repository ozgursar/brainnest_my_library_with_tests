import Storage from '../storage'
const testBook = {
  title: "Test Title",
  author: "Test Author",
  pages: "10",
  language: "English",
  publishDate: "2022-01-03T22:35:20.413Z",
  isreadradio: false,
  dateOfAdd: "2023-03-03T22:35:20.413Z",
}

test('Should be able to return empty array of books', () => {
  expect(Storage.getBooks().length).toBe(0)
})

jest.mock('../ui.js')
jest.mock('../progress-bar.js')

test('Should be able to add book to local storage', () => {
  Storage.addBookToLibrary(testBook)
  expect(Storage.getBooks()).toEqual([
  {
    title: testBook.title,
    author: testBook.author,
    pages: testBook.pages,
    language: testBook.language,
    publishDate: expect.any(String),
    isRead: testBook.isreadradio,
    dateOfAdd: expect.any(String)
  }])
})

