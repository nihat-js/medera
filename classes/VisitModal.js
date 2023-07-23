import Modal from "./Modal.js";
import { VisitCardiologist, VisitDentist, VisitTherapist } from "./Visit.js";


export default class VisitModal extends Modal {
  constructor(className) {
    super(className)
    const selectDoctorHeader = document.createElement("h4");
    selectDoctorHeader.textContent = "Select Doctor";

    const selectDoctor = document.createElement("select");
    selectDoctor.className = "doctor";
    selectDoctor.id = "";
    const option2 = document.createElement("option");
    option2.value = "cardiologist";
    option2.textContent = "Cardiologist";

    const option3 = document.createElement("option");
    option3.value = "dentist";
    option3.textContent = "Dentist";

    const option4 = document.createElement("option");
    option4.value = "therapist";
    option4.textContent = "Therapist";

    selectDoctor.append(option2, option3, option4);
    selectDoctor.onchange = this.renderFields.bind(this)


    const lowBloodPressureInput = document.createElement("input");
    lowBloodPressureInput.type = "number";
    lowBloodPressureInput.className = "low-blood-pressure";
    lowBloodPressureInput.placeholder = "Low blood pressure";

    const highBloodPressureInput = document.createElement("input");
    highBloodPressureInput.type = "number";
    highBloodPressureInput.className = "high-blood-pressure";
    highBloodPressureInput.placeholder = "High blood pressure";

    const bloodPressureDiv = document.createElement("div");
    bloodPressureDiv.classList = "blood-pressure"
    bloodPressureDiv.append(lowBloodPressureInput, highBloodPressureInput)

    const bmiInput = document.createElement("input");
    bmiInput.type = "number";
    bmiInput.className = "bmi";
    bmiInput.placeholder = "Body Mass Index";

    const previouslyDiseasesInput = document.createElement("input");
    previouslyDiseasesInput.type = "text";
    previouslyDiseasesInput.className = "previously-diseases";
    previouslyDiseasesInput.placeholder = "Previously diagnosed cardiovascular diseases";

    const ageHeader = document.createElement("h4")
    ageHeader.textContent = "Age"

    const ageInput = document.createElement("input");
    ageInput.type = "number";
    ageInput.className = "age";

    const lastVisitHeader = document.createElement("h4")
    lastVisitHeader.className = "last-visit-header"
    lastVisitHeader.textContent = "Last visit date"

    const lastVisitDateInput = document.createElement("input");
    lastVisitDateInput.type = "date";
    lastVisitDateInput.className = "last-visit-date";

    const visitPurposeHeader = document.createElement("h4");
    visitPurposeHeader.className = "purpose";
    visitPurposeHeader.textContent = "Visit purpose";

    const visitPurposeTextarea = document.createElement("textarea");
    visitPurposeTextarea.name = "";
    visitPurposeTextarea.id = "";
    visitPurposeTextarea.cols = "30";
    visitPurposeTextarea.rows = "3";

    const visitDescriptionHeader = document.createElement("h4");
    visitDescriptionHeader.textContent = "Brief visit description";

    const visitDescriptionTextarea = document.createElement("textarea");
    visitDescriptionTextarea.name = "";
    visitDescriptionTextarea.id = "";
    visitDescriptionTextarea.cols = "30";
    visitDescriptionTextarea.rows = "3";

    const selectUrgencyHeader = document.createElement("h4");
    selectUrgencyHeader.textContent = "Select urgency level";

    const selectUrgency = document.createElement("select");
    selectUrgency.className = "urgency";
    selectUrgency.id = "";

    const optionUrgency1 = document.createElement("option");
    optionUrgency1.value = "normal";
    optionUrgency1.textContent = "normal";

    const optionUrgency2 = document.createElement("option");
    optionUrgency2.value = "priority";
    optionUrgency2.textContent = "priority";

    const optionUrgency3 = document.createElement("option");
    optionUrgency3.value = "urgent";
    optionUrgency3.textContent = "urgent";

    selectUrgency.appendChild(optionUrgency1);
    selectUrgency.appendChild(optionUrgency2);
    selectUrgency.appendChild(optionUrgency3);

    const fullNameHeader = document.createElement("h4");
    fullNameHeader.className = "full-name";
    fullNameHeader.textContent = "Full Name";

    const fullNameInput = document.createElement("input");
    fullNameInput.type = "text";


    const errorSpan = document.createElement("span")
    errorSpan.className = "error"

    this.selectDoctor = selectDoctor
    this.visitPurposeTextarea = visitPurposeTextarea
    this.visitDescriptionTextarea = visitDescriptionTextarea
    this.selectUrgency = selectUrgency
    this.fullNameInput = fullNameInput
    this.lowBloodPressureInput = lowBloodPressureInput
    this.highBloodPressureInput = highBloodPressureInput
    this.bmiInput = bmiInput
    this.previouslyDiseasesInput = previouslyDiseasesInput
    this.ageHeader = ageHeader
    this.ageInput = ageInput
    this.lastVisitHeader = lastVisitHeader
    this.lastVisitDateInput = lastVisitDateInput
    this.errorSpan = errorSpan

    this.appendBody(selectDoctorHeader, selectDoctor, visitPurposeHeader, visitPurposeTextarea, visitDescriptionHeader, visitDescriptionTextarea, selectUrgencyHeader, selectUrgency, fullNameHeader, fullNameInput,
      bloodPressureDiv, bmiInput, previouslyDiseasesInput, ageHeader, ageInput, lastVisitHeader, lastVisitDateInput, errorSpan // extras
    )

    this.renderFields()



  }

  setError(str) {
    this.errorSpan.textContent = str
  }

  reset() {
    this.errorSpan.textContent = ""
    let arr = [this.visitDescriptionTextarea , this.visitPurposeTextarea,this.fullNameInput, this.lowBloodPressureInput, this.highBloodPressureInput, this.ageInput, this.lastVisitDateInput]
    for (let el of arr) {
      console.log(el);
      el.value = ""
    }
  }



  renderFields() {
    let extras = [this.lowBloodPressureInput, this.highBloodPressureInput, this.bmiInput, this.previouslyDiseasesInput, this.ageHeader, this.ageInput, this.lastVisitHeader, this.lastVisitDateInput]
    for (let extra of extras) {
      extra.style.display = "none"
    }
    switch (this.selectDoctor.value) {
      case "cardiologist":
        this.lowBloodPressureInput.style.display = "block"
        this.highBloodPressureInput.style.display = "block"
        this.bmiInput.style.display = "block"
        this.previouslyDiseasesInput.style.display = "block"
        this.ageHeader.style.display = "block"
        this.ageInput.style.display = "block"
        break;
      case "dentist":
        this.lastVisitHeader.style.display = "block"
        this.lastVisitDateInput.style.display = "block"
        break;
      case "therapist":
        this.ageHeader.style.display = "block"
        this.ageInput.style.display = "block"
        break;
    }
  }




}



export function generateCreateVisitModal() {



  renderFields()

  return modal
}