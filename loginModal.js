import Api  from "./classes/Api.js";
import Auth from "./classes/Auth.js";
import Modal from "./classes/Modal.js";

export function generateloginModal(renderNav,renderCards) {
  let loginModal = new Modal('login-modal')

  const imgElement = document.createElement("img");
  imgElement.className = "security";
  imgElement.src = "./img/security.svg";
  imgElement.alt = "";

  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Email";

  const emailInput = document.createElement("input");
  emailInput.className = "inp-email";
  emailInput.type = "text";
  emailInput.placeholder = "";

  const passwordLabel = document.createElement("label");
  passwordLabel.textContent = "Password";

  const passwordInput = document.createElement("input");
  passwordInput.className = "inp-password";
  passwordInput.type = "password";
  passwordInput.placeholder = "";

  const errorSpan = document.createElement("span");
  errorSpan.className = "error";

  const createAccountParagraph = document.createElement("p");
  const createAccountLink = document.createElement("a");
  createAccountLink.href = "#";
  createAccountLink.textContent = "new account";
  createAccountParagraph.appendChild(document.createTextNode("Create "));
  createAccountParagraph.appendChild(createAccountLink);

  const loginButton = document.createElement("button");
  loginButton.className = "btn-login";
  loginButton.type = "submit";
  loginButton.textContent = "Login";


  loginButton.onclick = async (e) => {
    e.preventDefault()
    let form = e.target.parentElement
    let errorEl = form.querySelector(".error")
    let emailInp = form.querySelector(".inp-email")
    let passwordInp = form.querySelector(".inp-password")

    if (!emailInp.value || !passwordInp.value) {
      errorEl.textContent = "Fill all the inputs"
      return
    }

    let token = await Api.login(emailInp.value,passwordInp.value)
    if (!token) {
      errorEl.textContent = "Check credentials again"
      passwordInp.value = ""
      passwordInp.focus()
    } else {
      console.log("Logged in successfully")
      Auth.setToken(token)
      loginModal.hide()
      document.querySelector('body > .container').style.display = "block"
      renderNav()
      renderCards()

    }
  }


  loginModal.appendBody(imgElement, emailLabel, emailInput, passwordLabel, passwordInput, errorSpan, createAccountParagraph, loginButton)
  return loginModal
}