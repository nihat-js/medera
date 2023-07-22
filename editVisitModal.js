import Modal from "./classes/Modal.js";
import VisitModal from "./classes/VisitModal.js"
import { VisitCardiologist, VisitDentist, VisitTherapist } from "./classes/Visit.js";




export function generateEditVisitModal() {
  let modal = new VisitModal("edit-visit-modal")

  let btnSaveChanges = document.createElement('button')
  btnSaveChanges.textContent = "Save changes"
  btnSaveChanges.onclick =  handleBtnSaveChanges.bind(modal)

  let btnDiscard = document.createElement('button')
  btnDiscard.textContent = "Discard changes"
  btnDiscard.onclick = this.modal.hide

  modal.appendBody(btnCreate)
  return modal
}




async function handleBtnSave(){
    let visit
    let {selectDoctor , visitPurposeTextarea , visitDescriptionTextarea , selectUrgency , fullNameInput , lowBloodPressureInput, highBloodPressureInput , bmiInput ,ageInput } = this
    switch (selectDoctor.value) {
      case 'cardiologist':
        visit = new VisitCardiologist({
          doctor: selectDoctor.value,
          purpose: visitPurposeTextarea.value,
          description: visitDescriptionTextarea.value,
          urgency: selectUrgency.value,
          fullName: fullNameInput.value,
          lowBloodPressure: lowBloodPressureInput.value,
          highBloodPressure: highBloodPressureInput.value,
          bmi: bmiInput.value,
          age: ageInput.value,
        })
        break;
      case 'dentist':
        visit = new VisitDentist({
          doctor: selectDoctor.value,
          purpose: visitPurposeTextarea.value,
          description: visitDescriptionTextarea.value,
          urgency: selectUrgency.value,
          fullName: fullNameInput.value,
          lastVisitDate: lastVisitDateInput.value
        })
        break;
      case 'therapist':
        visit = new VisitTherapist({
          doctor: selectDoctor.value,
          purpose: visitPurposeTextarea.value,
          description: visitDescriptionTextarea.value,
          urgency: selectUrgency.value,
          fullName: fullNameInput.value,
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

