import Api from "./Api.js"
import Auth from "./Auth.js"
import Modal from "./Modal.js"
import { VisitCardiologist, VisitDentist, VisitTherapist } from "./Visit.js"
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
  if (isLogged) {
    btnLogin.style.display = "none"
    btnLogout.style.display = "block"
    btnCreateVisit.style.display = "block"
  } else {
    btnLogin.style.display = "block"
    btnLogout.style.display = "none"
    btnCreateVisit.style.display = "none"

  }
}


function renderVisitModalFields() {
  console.log('changing...')
  let doctor = document.querySelector('.create-visit-modal .doctor')
  let purpose = document.querySelector('.create-visit-modal .purpose')
  let description = document.querySelector('.create-visit-modal .description')
  let urgency = document.querySelector('.create-visit-modal .urgency')
  let fullName = document.querySelector('.create-visit-modal .full-name')

  let lowBloodPressure = document.querySelector('.create-visit-modal .low-blood-pressure ')
  let highBloodPressure = document.querySelector('.create-visit-modal  .high-blood-pressure ')
  let BMI = document.querySelector('.create-visit-modal .bmi')
  let previouslyDiseases = document.querySelector('.create-visit-modal .previously-diseases ')
  let age = document.querySelector('.create-visit-modal .age')
  let lastVisitDate = document.querySelector('.create-visit-modal .last-visit-date')

  let extras = [lowBloodPressure, highBloodPressure, BMI, previouslyDiseases, age, lastVisitDate]
  console.log(extras)
  for (let extra of extras) {
    extra.style.display = "none"
  }

  switch (doctor.value) {
    case "cardiologist":
      lowBloodPressure.style.display = "block"
      highBloodPressure.style.display = "block"
      BMI.style.display = "block"
      previouslyDiseases.style.display = "block"
      break;
    case "dentist":
      lastVisitDate.style.display = "block"
      break;
    case "therapist":
      age.style.display = "block"
      break;

  }
}
let visits = [
  {
    fullName: "Nihat Abdullazade",
    doctor: "cardiologist",
    age: 18,
    reason: "Bllllo"
  }
]


for (let visit of visits) {
  let V
  switch (visit.doctor) {
    case "cardiologist":
      V = new VisitCardiologist(visit)
      break;
    case "dentist":
      V = new VisitDentist(visit)
      break;
    case "therapist":
      V = new VisitTherapist(visit)
      break;
  }

  let div = V.render()
  document.querySelector('.visits-board').append(div)



}

document.querySelector(".nav .btn-logout").onclick = function handleLogout() { Auth.logout(); isLogged = false; renderNav() }
document.querySelector(".nav .btn-login").onclick = () => loginModal.show()
document.querySelector(".nav .btn-create-visit").onclick = () => createVisitModal.show()

renderNav()

// document.querySelector(".create-visit-modal .doctor ").onchange = renderVisitModalFields

