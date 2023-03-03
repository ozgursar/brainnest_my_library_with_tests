import { myLibrary, renderCards, sortSelection } from "./index.js"

function handleSortChange () {
  switch (sortSelection.value) {
    case "title":
      myLibrary.sort(function(a, b) {
        return a.title.localeCompare(b.title)
      });
      break
    case "author":
      myLibrary.sort(function(a, b) {
        return a.author.localeCompare(b.author)
      });
      break
    case "language":
      myLibrary.sort(function(a, b) {
        return a.language.localeCompare(b.language)
      });
      break
    case "pages":
      myLibrary.sort(function(a, b) {
        return parseInt(a.pages) - parseInt(b.pages)
      });
      break
    case "isRead":
      myLibrary.sort(function(a, b) {
        return b.isRead - a.isRead
      });
      break
    default:
      // Default Sort: By date of addition to library
      myLibrary.sort(function(a, b) {
        return Date.parse(a.dateOfAdd) - Date.parse(b.dateOfAdd)
      });
  }
  renderCards (myLibrary)
}

export default handleSortChange