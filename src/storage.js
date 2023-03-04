import UI from "./ui"
import ProgressBar from "./progress-bar"


class Storage {

  // Simulate async database read
  static simulateDbRead (timeToWait) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let books = localStorage.getItem('myLibrary') ? JSON.parse(localStorage.getItem('myLibrary')) : []
        resolve(books)
      }, timeToWait)
    })
  }

  // Simulate async database write  
  static simulateDbWrite (myLibrary, timeToWait) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
        resolve()
      }, timeToWait)
    })
  }

  static async getBooks () {
    let myLibrary = await Storage.simulateDbRead(1000)
    return myLibrary
  }

  static async setBooks (myLibrary, norender) {
    await Storage.simulateDbWrite(myLibrary, 300)
    if (!norender) {
      UI.renderCards(myLibrary)
    }
    ProgressBar.updateProgress(myLibrary)
  }

}

export default Storage