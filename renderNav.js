import Auth from "./classes/Auth.js"

export function renderNav() {
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