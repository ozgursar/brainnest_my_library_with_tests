import Book from "./book"
import UI from "./ui"
import ProgressBar from "./progress-bar"

class Storage {
  
  static getBooks () {
    let myLibrary = localStorage.getItem('myLibrary') ? JSON.parse(localStorage.getItem('myLibrary')) : []
    return myLibrary
  }

  static setBooks (myLibrary, norender) {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    if (!norender) {
      UI.renderCards()
    }
    ProgressBar.updateProgress()
  }

  static addBookToLibrary = ({title, author, pages, language, publishDate, isreadradio, bookcover}) => {
    let myLibrary = Storage.getBooks()
    let isRead = false
    if (isreadradio === "yes") isRead = true
    const book = new Book (title, author, pages, language, publishDate, isRead, bookcover)
    myLibrary.push (book)
    Storage.setBooks(myLibrary)
  }

  static deleteBook = (targetIndex) => {
    let myLibrary = Storage.getBooks() 
    myLibrary.splice(targetIndex, 1)
    Storage.setBooks(myLibrary)
  }

  static toggleRead = ({item, value}) => {
    let myLibrary = Storage.getBooks() 
    myLibrary[item].isRead=value
    const norender = true
    Storage.setBooks(myLibrary, norender)
  }

}

export default Storage