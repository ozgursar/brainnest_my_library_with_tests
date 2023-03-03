const updateProgress = () => {
  let progress = 0
  const progressBar = document.querySelector(".progress .bar")
  const progressAmount = document.querySelector(".pattern span")
  const noBooksRead = document.querySelector(".nobooksread")
  
  const myLibrary = localStorage.getItem('myLibrary') ? JSON.parse(localStorage.getItem('myLibrary')) : []
  const readBooks = myLibrary.filter((book) => {
    return book.isRead
  })
  if (readBooks.length) {
    progress= Math.floor (readBooks.length / myLibrary.length * 100)
    progressAmount.style.backgroundColor = "rgba(0,0,0,0.6)"
    progressAmount.textContent = progress + "%"
    noBooksRead.style.display = "none"
    
  } else {
    progressAmount.textContent = ""
    progressAmount.style.backgroundColor = "transparent"
    noBooksRead.style.display = "block"
  }
  progressBar.style.width = progress + "%"  
  return progress
}

export default updateProgress