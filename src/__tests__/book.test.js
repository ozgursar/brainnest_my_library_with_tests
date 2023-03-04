import Book from "../book"

const testBook = {
  title: "Test Book 123",
  author: "Test Author",
  pages: "105",
  language: "German",
  publishDate: "2020-01-03T22:35:20.413Z",
  isreadradio: "yes"
}
const expectedBook = {
  title: "Test Book 123",
  author: "Test Author",
  pages: "105",
  language: "German",
  publishDate: "2020-01-03T22:35:20.413Z",
  isRead: true
}

jest.mock('../ui.js')
jest.mock('../progress-bar')

test('Successfully adds book to array of books in library', () => {
  return Book.addBookToLibrary(testBook).then(() => {
    expect(JSON.parse(localStorage.getItem('myLibrary')).at(0)).toMatchObject(expectedBook)
  })
})

test('Successfully toggles read status of a book', () => {
  const bookToToogle = {item: 0, value: false}
  expectedBook.isRead = false

  return Book.toggleRead(bookToToogle).then(() => {
    expect(JSON.parse(localStorage.getItem('myLibrary')).at(0)).toMatchObject(expectedBook)
  })
})

test('Successfully deletes a book', () => {
  const targetBookIndex = 0

  return Book.deleteBook(targetBookIndex).then(() => {
    expect(JSON.parse(localStorage.getItem('myLibrary'))).toEqual([])
  })
})