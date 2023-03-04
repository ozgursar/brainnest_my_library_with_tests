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

}

export default Storage