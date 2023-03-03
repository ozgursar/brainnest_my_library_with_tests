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
  toggleRead = function () {
    this.isRead = !this.isRead
    console.log ("Read status: " + this.isRead)
  }
}

export default Book