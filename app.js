import Api from "./classes/Api.js"
import Auth from "./classes/Auth.js"
import Modal from "./classes/Modal.js"
import { VisitCardiologist, VisitDentist, VisitTherapist } from "./classes/Visit.js"
import { generateloginModal, } from "./loginModal.js"
import { generateCreateVisitModal } from "./createVisitModal.js"
import { generateEditVisitModal } from "./editVisitModal.js"
import { renderNav,  filterCards } from "./utils.js"
import {lang} from "./lang.js"
let loginModal = generateloginModal(renderNav,renderCards)
let createVisitModal = generateCreateVisitModal(renderCards)
let editVisitModal = generateEditVisitModal(renderCards)
let cards , filter = {}
document.body.append(loginModal.render(), createVisitModal.render(),editVisitModal.render())







async function renderCards(refreshServer = true) {


  if (refreshServer) {
    let api = new Api(Auth.getToken())
    cards = await api.getCards()
  }

  document.querySelector('.cards').innerHTML = ""
  let filteredCards = filterCards(cards,filter)
  console.log('filteredCards',filteredCards)
  for (let card of filteredCards) {
    let areDetailsShown = false
    let div = document.createElement("div")
    div.classList = "box"
    for (let key in lang) {
      if (!card[key]) continue
      let h3 = document.createElement("h3")
      h3.innerHTML = lang[key]?.meaning + ": " + "<span class='text-normal'>" + card[key] + '</span>' 
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
      editVisitModal.show()
      editVisitModal.id = card.id
      editVisitModal.selectDoctor.value = card.doctor
      editVisitModal.visitPurposeTextarea.value = card.purpose
      editVisitModal.visitDescriptionTextarea.value = card.description
      editVisitModal.selectUrgency.value = card.urgency
      editVisitModal.fullNameInput.value = card.fullName

      editVisitModal.lowBloodPressureInput.value = card.lowBloodPressure
      editVisitModal.highBloodPressureInput.value = card.highBloodPressure
      editVisitModal.bmiInput.value = card.bmi || ""
      editVisitModal.previouslyDiseasesInput.value = card.previouslyDiseases || ""
      editVisitModal.ageInput.value = card.age


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





document.querySelector(".nav .btn-logout").onclick = function handleLogout() { Auth.logout();  renderNav() , document.querySelector('body > .container').style.display = "none" }
document.querySelector(".nav .btn-login").onclick = () => loginModal.show()
document.querySelector(".nav .btn-create-visit").onclick = () => createVisitModal.show()

document.querySelector('.filter .inp-full-name').onkeyup = (e) => { filter.fullName = e.target.value; renderCards(false) }
document.querySelector('.filter .inp-description').onkeyup = (e) => { filter.description = e.target.value; renderCards(false) }
document.querySelector('.filter  .select-status').onchange = (e) => { filter.status = e.target.value; renderCards(false) }
document.querySelector('.filter .select-urgency').onchange = (e) => { filter.urgency = e.target.value; renderCards(false) }


if (Auth.getToken()){
  renderCards()
}else{
  document.querySelector('.cards').innerHTML += "No items have been added."
}
renderNav()



