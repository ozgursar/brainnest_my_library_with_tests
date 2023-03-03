import './css/modal.css';

const modal = document.querySelector(".modal")
const modalContent = document.querySelector(".modal-content")
const closeIcon = document.querySelector(".icon-close")

const openModal = (e) => {
  document.body.style.overflow = "hidden"
  modal.style.display = "block"
}

const closeModal = (e) => {
  if (e.target && !e.currentTarget.classList.contains("modal-content")) {
    document.body.style.overflow = "auto"
    modal.style.display = "none"
  }
  e.stopPropagation()
}

if (closeIcon) {
  closeIcon.addEventListener('click', closeModal)
}

if (modalContent) {
  modalContent.addEventListener('click', closeModal)
}

if (modal) {
  modal.addEventListener('click', closeModal)
}

document.addEventListener('keydown', function(e) {
  if(e.key === "Escape") {
    document.body.style.overflow = "auto"
    modal.style.display = "none"
  }
})

export default modal
export { openModal, closeModal }