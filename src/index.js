import Book from "./book"
import UI from "./ui"
import './css/style.css'
import favicon from './images/bookshelf.svg'
import checkicon from './images/check.svg'
import placeholder from './images/placeholder.jpg'

document.querySelector('#sort-selection').addEventListener ('change', UI.handleSortChange)
document.querySelector(".add-btn").addEventListener('click', UI.handleAddBookButton)
document.querySelector(".add-form").addEventListener('submit', UI.handleSubmit)
window.handleDelete = Book.deleteBook
window.handleToggleRead = Book.toggleRead
window.previewFile = UI.previewFile

// Reset to default sort and render cards
UI.handleSortChange() 
