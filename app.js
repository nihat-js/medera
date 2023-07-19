import Auth from "./Auth.js"

let isLogged = false
let res = Auth.checkSavedCredentials()
if (res) {
  isLogged = true
} else {
  localStorage.clear('credentials')
}
renderNav()




function handleLogin(e) {
  e.preventDefault()
  let form = e.target.parentElement
  let errorEl = form.querySelector(".error")
  let usernameInp = form.querySelector(".inp-username")
  let passwordInp = form.querySelector(".inp-password")

  if (!usernameInp.value || !passwordInp.value) {
    errorEl.textContent = "Fill all the inputs"
    return
  }

  let answer = Auth.checkCredentials(usernameInp.value, passwordInp.value)
  if (!answer) {
    errorEl.textContent = "Check credentials again"
    passwordInp.value = ""
    passwordInp.focus()
  } else {
    console.log("Logged in successfully")
    isLogged = true
    saveCredentials(usernameInp.value, passwordInp.value)
    renderNav()

  }
}

function handleLogout() {
  localStorage.setItem('credentials', null)
  isLogged = false
  renderNav()
}


function saveCredentials(username, password) {
  localStorage.setItem('credentials', JSON.stringify({
    username,
    password,
    loginTime: Date.now()
  }))
}

function renderNav() {
  let btnLogin = document.querySelector(".nav .btn-login")
  let btnLogout = document.querySelector(".nav .btn-logout")
  let btnCreate = document.querySelector(".nav .btn-create")
  if (isLogged) {
    btnLogin.style.display = "none"
    btnLogout.style.display = "block"
    btnCreate.style.display = "block"
  } else {
    btnLogin.style.display = "block"
    btnLogout.style.display = "none"
    btnCreate.style.display = "none"

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


document.querySelector(".modal-login .btn-login").onclick = handleLogin
document.querySelector(".nav .btn-logout").onclick = handleLogout
document.querySelector(".create-visit-modal .doctor ").onchange = renderVisitModalFields