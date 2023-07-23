import Modal from "./classes/Modal.js";
import VisitModal from "./classes/VisitModal.js"
import { Visit, VisitCardiologist, VisitDentist, VisitTherapist } from "./classes/Visit.js";




export function generateCreateVisitModal(renderCards) {
  let modal = new VisitModal("visit-modal")
  let btnCreate = document.createElement('button')
  btnCreate.textContent = "Create"
  btnCreate.onclick = handlBtnCreate.bind(modal, renderCards)
  modal.appendBody(btnCreate)
  return modal
}




async function handlBtnCreate(renderCards) {
  let visit, isValid

  let mainFields = {
    doctor: this.selectDoctor.value,
    purpose: this.visitPurposeTextarea.value,
    description: this.visitDescriptionTextarea.value,
    urgency: this.selectUrgency.value,
    fullName: this.fullNameInput.value,
  }

  isValid = Visit.validate(mainFields) // main validation with parent class
  if (typeof isValid != "boolean") {
    this.setError(isValid)
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
        previouslyDiseases : this.previouslyDiseasesInput.value
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
        age: this.ageInput.value
      })
      break;
    default:
  }

  isValid = visit.validate()  // child class validation
  if (typeof isValid !== "boolean"){
    this.setError(isValid)
    return false
  }


  let result = await visit.add()
  this.hide()
  if (result) {
    renderCards()
  }
}

