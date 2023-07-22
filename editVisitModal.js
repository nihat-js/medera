import Modal from "./classes/Modal.js";
import VisitModal from "./classes/VisitModal.js"
import { Visit,VisitCardiologist, VisitDentist, VisitTherapist } from "./classes/Visit.js";




export function generateEditVisitModal(renderCards) {
  let modal = new VisitModal("visit-modal")

  let btnsSave = document.createElement('button')
  btnsSave.classList.add('btn-save')
  btnsSave.textContent = "Save changes"
  
  btnsSave.onclick =  handleBtnSave.bind(modal,renderCards)
  
  let btnDiscard = document.createElement('button')
  btnDiscard.textContent = "Discard changes"
  btnDiscard.classList.add('btn-discard')
  btnDiscard.onclick = modal.hide.bind(modal)

  modal.appendBody(btnsSave,btnDiscard)
  return modal
}




async function handleBtnSave(renderCards) {
  let visit
  let mainFields = {
    id : this.id,
    doctor: this.selectDoctor.value,
    purpose: this.visitPurposeTextarea.value,
    description: this.visitDescriptionTextarea.value,
    urgency: this.selectUrgency.value,
    fullName: this.fullNameInput.value,
    
  }

  let foo = Visit.validate(mainFields)
  if (!foo){
    this.setError("Fill the fields")
    return false
  }

  switch (this.selectDoctor.value) {
    case 'cardiologist':
      visit = new VisitCardiologist({
        ...mainFields,
        lowBloodPressure: this.lowBloodPressureInput.value,
        highBloodPressure: this.highBloodPressureInput.value,
        bmi: this.bmiInput.value,
        age: this.ageInput.value,
      })
      break;
    case 'dentist':
      visit = new VisitDentist({
        ...mainFields,
        lastVisitDate: this.lastVisitDateInput.value
      })
      break;
    case 'therapist':
      visit = new VisitTherapist({
        ...mainFields,
        age: this.age
      })
      break;
    default:
  }
  console.log({visit})
  let result = await visit.save()
  if (result) {
    renderCards()
  }
  this.hide()
}
