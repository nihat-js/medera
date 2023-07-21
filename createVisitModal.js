import Modal from "./classes/Modal.js";
import VisitModal from "./classes/VisitModal.js"
import { VisitCardiologist, VisitDentist, VisitTherapist } from "./classes/Visit.js";




export function generateCreateVisitModal() {
  let modal = new VisitModal()

      extra.style.display = "none"
    }
    switch (selectDoctor.value) {
      case "cardiologist":
        lowBloodPressureInput.style.display = "block"
        highBloodPressureInput.style.display = "block"
        bmiInput.style.display = "block"
        previouslyDiseasesInput.style.display = "block"
        break;
      case "dentist":
        lastVisitHeader.style.display = "block"
        lastVisitDateInput.style.display = "block"
        break;
      case "therapist":
        ageHeader.style.display = "block"
        ageInput.style.display = "block"
        break;
    }
  }

  btnCreate.onclick = async () => {
    let visit
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
      modal.hide()
    }
  }

  renderFields()

  return modal
}