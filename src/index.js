import Storage from "./storage"
import UI from "./ui"
import './css/style.css'
import favicon from './images/bookshelf.svg'
import checkicon from './images/check.svg'
import placeholder from './images/placeholder.jpg'

// Add event listeners
document.querySelector('#sort-selection').addEventListener ('change', UI.handleSortChange)
document.querySelector(".add-btn").addEventListener('click', UI.handleAddBookButton)
document.querySelector(".add-form").addEventListener('submit', UI.handleSubmit)
window.handleDelete = Storage.deleteBook
window.handleToggleRead = Storage.toggleRead
window.previewFile = UI.previewFile

// On init reset to default sort and render cards
UI.handleSortChange() 
