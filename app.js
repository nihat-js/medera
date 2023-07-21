import Api from "./classes/Api.js"
import Auth from "./classes/Auth.js"
import Modal from "./classes/Modal.js"
import { VisitCardiologist, VisitDentist, VisitTherapist } from "./classes/Visit.js"
import { generateloginModal, } from "./loginModal.js"
import { generateCreateVisitModal } from "./createVisitModal.js"


let isLogged = Boolean(Auth.getToken())
let loginModal = generateloginModal(renderNav)
let createVisitModal = generateCreateVisitModal()
document.body.append(loginModal.render(), createVisitModal.render())





function renderNav() {
  let btnLogin = document.querySelector(".nav .btn-login")
  let btnLogout = document.querySelector(".nav .btn-logout")
  let btnCreateVisit = document.querySelector(".nav .btn-create-visit")
  if (Boolean(Auth.getToken())) {
    btnLogin.style.display = "none"
    btnLogout.style.display = "block"
    btnCreateVisit.style.display = "block"
  } else {
    btnLogin.style.display = "block"
    btnLogout.style.display = "none"
    btnCreateVisit.style.display = "none"

  }
}




async function renderVisits() {
  let api = new Api(Auth.getToken())
  let cards = await api.getCards()
  console.log(cards)
}


renderVisits()
//   switch (visit.doctor) {
//     case "cardiologist":
//       V = new VisitCardiologist(visit)
//       break;
//     case "dentist":
//       V = new VisitDentist(visit)
//       break;
//     case "therapist":
//       V = new VisitTherapist(visit)
//       break;
//   let div = V.render()
//   document.querySelector('.visits-board').append(div)



// }

document.querySelector(".nav .btn-logout").onclick = function handleLogout() { Auth.logout(); isLogged = false; renderNav() }
document.querySelector(".nav .btn-login").onclick = () => loginModal.show()
document.querySelector(".nav .btn-create-visit").onclick = () => createVisitModal.show()

renderNav()


