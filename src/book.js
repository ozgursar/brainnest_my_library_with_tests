import Storage from "./storage"

class Book {

  constructor(title, author, pages, language, publishDate, isRead, bookcover) {
    this.title = title
    this.author = author
    this.pages = pages
    this.language = language
    this.publishDate = publishDate
    this.isRead = isRead
    this.bookcover = bookcover
    this.dateOfAdd = new Date()
  }

  static async addBookToLibrary ({title, author, pages, language, publishDate, isreadradio, bookcover}) {
    let myLibrary = await Storage.getBooks()
    let isRead = false
    if (isreadradio === "yes") isRead = true
    const book = new Book (title, author, pages, language, publishDate, isRead, bookcover)
    myLibrary.push (book)
    Storage.setBooks(myLibrary)
  }

  static async deleteBook (targetIndex) {
    let myLibrary = await Storage.getBooks() 
    myLibrary.splice(targetIndex, 1)
    Storage.setBooks(myLibrary)
  }

  static async toggleRead ({item, value}) {
    let myLibrary = await Storage.getBooks() 
    myLibrary[item].isRead=value
    const norender = true
    Storage.setBooks(myLibrary, norender)
  }

}

export default Book