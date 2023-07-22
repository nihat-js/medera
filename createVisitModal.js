import Modal from "./classes/Modal.js";
import VisitModal from "./classes/VisitModal.js"
import { Visit, VisitCardiologist, VisitDentist, VisitTherapist } from "./classes/Visit.js";




export function generateCreateVisitModal() {
  let modal = new VisitModal("visit-modal")
  let btnCreate = document.createElement('button')
  btnCreate.textContent = "Create"
  btnCreate.onclick = handlBtnCreate.bind(modal)
  modal.appendBody(btnCreate)
  return modal
}




async function handlBtnCreate() {
  let visit

  let mainFields = {
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

  let result = await visit.save()
  if (result) {
    this.hide()
  }
}

