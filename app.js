import Api from "./classes/Api.js"
import Auth from "./classes/Auth.js"
import Modal from "./classes/Modal.js"
import { VisitCardiologist, VisitDentist, VisitTherapist } from "./classes/Visit.js"
import { generateloginModal, } from "./loginModal.js"
import { generateCreateVisitModal } from "./createVisitModal.js"
import { renderNav } from "./renderNav.js"

let isLogged = Boolean(Auth.getToken())
let loginModal = generateloginModal(renderNav)
let createVisitModal = generateCreateVisitModal()
let cards
document.body.append(loginModal.render(), createVisitModal.render())

let filter = {}








async function renderCards(refreshServer = true) {

  if (refreshServer) {
    let api = new Api(Auth.getToken())
    cards = await api.getCards()
  }

  document.querySelector('.cards').innerHTML = ""
  let areDetailsShown = false
  let lang = {
    doctor: {
      meaning: 'doctor',
      main: true,
    },
    purpose: {
      meaning: 'purpose',
      main: true,
    },
    description: {
      meaning: 'description',
      main: true
    },
    urgency: {
      meaning: 'Urgency Level',
      main: true,
    },
    fullName: {
      meaning: "Full Name",
      main: true
    },
    lowBloodPressure: {
      meaning: 'Low Blood Pressure',
    },
    highBloodPressure: {
      meaning: 'High Blood Pressure',
    },
    bmi: {
      meaning: "Body Mass Index"
    },
    previouslyDiseases: {
      meaning: "Previously diagnosed cardiovascular diseases"
    },
    age: {
      meaning: "Age"
    }
  }
  console.log(cards)
  let filteredCards = cards.filter(card => {
    if (  (filter.status != "" && filter.status != card.status )  || (filter.urgency != "" && filter.urgency != card.urgenct)  ){
      return false
    }
    return true
  })
  for (let card of filteredCards) {
    let div = document.createElement("div")
    div.classList = "box"
    for (let key in lang) {
      if (!card[key]) continue
      let h3 = document.createElement("h3")
      h3.innerText = lang[key]?.meaning + ": " + card[key]
      if (!lang[key]?.main) {
        h3.classList.add('extra-fields')
        h3.style.display = "none"
      }
      div.append(h3)
    }
    let showMoreBtn = document.createElement("button")
    showMoreBtn.classList.add('btn-show-more')
    showMoreBtn.textContent = "Show more"


    showMoreBtn.onclick = () => {
      let fields = div.querySelectorAll('.extra-fields')
      areDetailsShown ? (fields.forEach(f => f.style.display = "none"), showMoreBtn.textContent = "Show More") : (fields.forEach(f => f.style.display = "block"), showMoreBtn.textContent = "Show Less")
      areDetailsShown = !areDetailsShown
    }


    let editBtn = document.createElement("button")
    editBtn.classList = "btn btn-edit"
    editBtn.textContent = "Edit "
    editBtn.onclick = () => {

    }

    let deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "&times;"
    deleteBtn.classList.add('btn', 'btn-delete')
    deleteBtn.onclick = async () => {
      let api = new Api(Auth.getToken())
      let res = await api.deleteCard(card.id)
      if (res) {
        renderCards()
      }
    }
    div.append(showMoreBtn, editBtn, deleteBtn)
    document.querySelector('.cards').append(div)
  }

}


renderCards()



document.querySelector(".nav .btn-logout").onclick = function handleLogout() { Auth.logout(); isLogged = false; renderNav() }
document.querySelector(".nav .btn-login").onclick = () => loginModal.show()
document.querySelector(".nav .btn-create-visit").onclick = () => createVisitModal.show()

renderNav()


document.querySelector('.filter .inp-full-name').onkeyup = (e) => { filter.fullName = e.target.value ; renderCards(false) }
document.querySelector('.filter  .select-status').onchange = (e) => { filter.status = e.target.value ; renderCards(false) }
document.querySelector('.filter .select-urgency').onchange = (e) => { filter.urgency = e.target.value ; renderCards(false) }


