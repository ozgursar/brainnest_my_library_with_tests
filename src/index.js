import { openModal, closeModal } from "./modal.js"
import Book from "./book.js"
import handleSortChange from "./sort-books.js"
import updateProgress from "./progress-bar.js"
import './css/style.css'
import favicon from './images/bookshelf.svg'
import checkicon from './images/check.svg'
import placeholder from './images/placeholder.jpg'

// Elements
const addBtn = document.querySelector(".add-btn")
const addForm = document.querySelector(".add-form")
const cards = document.querySelector(".cards")
const sortSelection = document.querySelector('#sort-selection')

// Initial render from local storage
// Force default sort (by date of addition) in inital render
let myLibrary = localStorage.getItem('myLibrary') ? JSON.parse(localStorage.getItem('myLibrary')) : []
handleSortChange()
updateProgress()
renderCards()

const addBookToLibrary = ({title, author, pages, language, publishDate, isreadradio, bookcover}) => {
  let isRead = false
  if (isreadradio === "yes") isRead = true
  const book = new Book (title, author, pages, language, publishDate, isRead, bookcover)
  myLibrary.push (book)
  updateLocalStorage()
  updateProgress()
  renderCards()
}

// Helpers
function updateLocalStorage () {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

function htmlToElements (html) {
  let template = document.createElement('template')
  template.innerHTML = html
  return template.content.childNodes
}

function renderCards(itemToRender) {
  cards.replaceChildren()

  let renderedLibrary = myLibrary
  if (itemToRender) {
    renderedLibrary = itemToRender
  }
  if (renderedLibrary.length) {
  renderedLibrary.forEach ( ({title, author, pages, language, publishDate, isRead, bookcover }, index) => {
    const newCard = htmlToElements(
      `<article class="card" data-id="${index}" style="animation-delay: ${index*200}ms;">
        <figure>
          <img src="${bookcover ? bookcover : './images/placeholder.jpg'}" alt="${title}">
          <figcaption><h2 class="card-title">${title}</h2></figcaption>
        </figure>
        <ul class="card-meta">
          <li><i class="icon-account-edit" aria-label="Author" title="Author"></i><span>By ${author}</span></li>
          <li><i class="icon-pages" aria-label="Number of pages" title="Number of pages"></i><span>${pages} pages</span></li>
          <li><i class="icon-translate" aria-label="Language" title="Language"></i><span>${language}</span></li>
          <li><i class="icon-calendar-clock" aria-label="Publish date" title="Publish date"></i><span>${new Date(publishDate).toLocaleDateString('en-GB')}</span></li>
        </ul>
        <div class="isread-toggle">
          <small>Is Read?</small>
          <div class="switch-field">
            <input type="radio" id="toggle-radio-${index}-yes" name="isreadradio-${index}" value="yes" ${isRead ? 'checked' : ''} onInput="handleToggleRead({item: ${index}, value: true})">
            <label for="toggle-radio-${index}-yes">Yes</label>
            <input type="radio" id="toggle-radio-${index}-no" name="isreadradio-${index}" value="no" ${!isRead ? 'checked' : ''} onInput="handleToggleRead({item: ${index}, value: false})">
            <label for="toggle-radio-${index}-no">No</label>
          </div>
        </div>
        <i class="icon-close" aria-label="Delete book" onClick="handleDelete(this.parentNode.getAttribute('data-id'))"></i>
      </article>`)
  cards.appendChild(newCard[0])
  })
  } else {
    cards.textContent = "No books present in the library."
  }
}

// Handlers
const handleAddBookButton = () => {
  document.querySelector('.bookcover').value="" // Form reset does not reset hidden fields. Needs manual reset
  addForm.reset()
  document.querySelector('.book-cover-preview').src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQYGBgYICQgJCAwLCgoLDBINDg0ODRIbERQRERQRGxgdGBYYHRgrIh4eIisyKigqMjw2NjxMSExkZIYBBQUFBQUFBgYGBggJCAkIDAsKCgsMEg0ODQ4NEhsRFBERFBEbGB0YFhgdGCsiHh4iKzIqKCoyPDY2PExITGRkhv/CABEIAMgAyAMBIgACEQEDEQH/xAAcAAEBAQEAAwEBAAAAAAAAAAAAAQYHAgQFAwj/2gAIAQEAAAAA/rMAAAFgAAALAAAAWAAAAsAAABYAAACwAAAFgAAALAMl4gHuaMFgGL2gBi9oCwDF7QOF9H1rF7QFgGL2gc22H2WL2gLAMXtMhkuuHh63uYvaAsAxf68L/LpPX/DiPxu+ZnaAsA47z78jpPzcQ+70noQLAP5i9QA2HeAWAZP1gD633wWAAAAsAAABYAAACwAAAFgAAALAAAAWAAAAsAAABf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/2gAIAQIQAAAA0AAAAAAAABQQCxZYBbcakA10S55gKIAAAAAAAAAf/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//aAAgBAxAAAADIAAAAAAAAAJQBLKAzN5tAzzWa6AIKAAAAAAAAAf/EAD0QAAECAwIIDAQFBQAAAAAAAAECAwQFBgAxEhYgMEBBUpMQESEiNDZRVWJ0dbETFHHCByNDc7JCYZHB0f/aAAgBAQABPwDSBeNJF40kXjSReNJF40kXjSReNJF4zDlXMfHfbhpbMIlLThbU4y1hIwk3i2Ni+4ZvuLY2L7hm+4tjYvuGb7i2Ni+4ZvuLY2L7hm+4tjYvuGb7i2Ni+4ZvuLY2L7hm+4tjYvuGb7i0tqSGmEb8kuEi4Z8t4aEPt4GGB2ZYvGYojoUz9Te9k5qN68SvyTn3ZYvGYojoUz9Te9k5U6rGcRUe78rFLYYbcIbSjk5BrVaj55ETuXLVFcReZcwFKA4sIXg8Mb14lfkXPuyxeMxRHQpn6m97Jypv+HyY2OciYOLS0l1eEttSOMJJvKbSKSQ8hgRCsqKyVYbiz/UrhjevEr8i592WLxmKI6FM/U3vZPBVNUsyNksMFK4xaeanUgbSrUrWjrb3yc2eKkOK5j6r0E6leHIccbabW44tKUJSVKUo8QAGs2gJhBzOHTEwbyXGiSOMdo1EG7gjevEr8i592WLxmKI6FM/U3vZNqpqlmRslhgpXGLTzU6kDaVZ992JeW88tS3FqJUpV5J4KQrAwnw5dMnPybmnj+n4VeG19nHG2W1uOLSlCUlSlKPEABrNqsqxycrMJCFSINJ+hdI1nw9gtIJ9FSGL+K1zmlcjrWpQ/7aXTGEmkI3FQrmE2r/IPYew2jevEr8i592WLxmIOp25FK5kyyAqLdmL5QDcgcQGEbPvvRLy3nnFLcWrjUpXKScikKwEIG5dMnPyLmXj+n4VeG1WVWucOGEhFFMGlX0LpGs+HsHDIZ9FyGLDrRwmlcjrRuWP9HsNm5jCTSrpPFQrmEhUC59UnnchyxeMxH9Oi/wB9z+WaoXrHDftufxyxeMxGUVIY2JdiFsuJW4oqVgLIBJtiBT2w/vLYgU9sP7y2IFPbD+8tiBT2w/vLYgU9sP7y2IFPbD+8tiBT2w/vLYgU9sP7y2IFPbD+8tKaZlEmeU/CtK+IU4OGtWEQP7ZYvGki8aSLxpIvGki8aSLxpIvGki8aSLxb/8QAHxEAAQMFAQEBAAAAAAAAAAAAAQARUQIQITBBUBIx/9oACAECAQE/APXCxCxCxCxCxGjhvS3Uf1DRwqml1VTFvnCHdFIe7B3sR3S5lOZTmU5lOfZ//8QAHhEAAQMFAQEAAAAAAAAAAAAAAAERUQIQITBBUBL/2gAIAQMBAT8A9jMmZMyZkzo7ep+CC6OlVTFNU2+si6Kla7qzWReaWSBkgZIGSBk9n//Z"
  openModal()
}

const handleSubmit = (e) => {
  e.preventDefault()
  closeModal(e)
  const formData = new FormData(e.target)
  const formProps = Object.fromEntries(formData)
  addBookToLibrary (formProps)
}

window.handleDelete = (targetIndex) => {
  myLibrary.splice(targetIndex, 1)
  updateLocalStorage()
  updateProgress()
  renderCards()
}

window.handleToggleRead = ({item, value}) => {
  myLibrary[item].isRead=value
  updateLocalStorage()
  updateProgress()
}

window.previewFile = () => {
  const preview = document.querySelector('.book-cover-preview')
  const file = document.querySelector('input[type=file]').files[0]
  const bookcover = document.querySelector('.bookcover')
  const reader = new FileReader()

  reader.addEventListener("load", () => {
    // convert image file to base64 string and store the value in hidden bookcover field
    preview.src = reader.result
    bookcover.value = reader.result
  }, false)

  if (file) {
    reader.readAsDataURL(file)
  }
}

// Event listeners
if (addBtn) {
  addBtn.addEventListener('click', handleAddBookButton)
}

if (addForm) {
  addForm.addEventListener('submit', handleSubmit)
}

if (sortSelection) {
  sortSelection.addEventListener ('change', handleSortChange)
}

export { myLibrary, renderCards, sortSelection }