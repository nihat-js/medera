export default class Modal {
  modalDiv = null
  constructor(className) {
    let modalDiv = document.createElement('div')
    modalDiv.classList.add('modal', className)
    modalDiv.style.display = "none"
    let containerDiv = document.createElement('div')
    containerDiv.classList.add('modal-container')

    let closeBtn = document.createElement('button')
    closeBtn.classList.add('close-btn')
    closeBtn.innerHTML = "&times;"
    closeBtn.onclick = () => this.hide()

    containerDiv.append(closeBtn)
    modalDiv.append(containerDiv)
    this.modalDiv = modalDiv
    window.addEventListener('click', (event) => this.handleClick(event, this))
    window.addEventListener('keyup', (event) => this.handleKeyUp(event, this))
  }

  handleKeyUp(event, this_) {
    if (event.key === "Escape") this_.hide()
  }

  handleClick(event, this_) {
    if (event.target.classList.contains('modal')) this_.hide()
  }

  appendBody() {
    this.modalDiv.querySelector('.modal-container').append(...arguments)
  }

  hide() {
    this.modalDiv.style.display = 'none'
  }
  show() {
    this.modalDiv.style.display = 'flex'
  }

  render() {
    return this.modalDiv
  }
}