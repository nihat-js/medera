import Database from "./Database.js"

let isLogged = false
let res = Database.checkSavedCredentials()
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

  let answer = Database.checkCredentials(usernameInp.value, passwordInp.value)
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



document.querySelector(".modal-login .btn-login").onclick = handleLogin
document.querySelector(".nav .btn-logout").onclick = handleLogout