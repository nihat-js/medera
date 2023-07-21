import Modal from "./classes/Modal.js";

export function generateCreateVisitModal() {
  let modal = new Modal("create-visit-modal")

  const selectDoctorHeader = document.createElement("h4");
  selectDoctorHeader.textContent = "Select Doctor";

  const selectDoctor = document.createElement("select");
  selectDoctor.className = "doctor";
  selectDoctor.id = "";

  // const option1 = document.createElement("option");
  // option1.value = "";
  // option1.disabled = true;
  // option1.selected = true;
  // option1.textContent = "Select Doctor";

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
  optionUrgency1.value = "";
  optionUrgency1.textContent = "normal";

  const optionUrgency2 = document.createElement("option");
  optionUrgency2.value = "";
  optionUrgency2.textContent = "priority";

  const optionUrgency3 = document.createElement("option");
  optionUrgency3.value = "";
  optionUrgency3.textContent = "urgent";

  selectUrgency.appendChild(optionUrgency1);
  selectUrgency.appendChild(optionUrgency2);
  selectUrgency.appendChild(optionUrgency3);

  const fullNameHeader = document.createElement("h4");
  fullNameHeader.className = "full-name";
  fullNameHeader.textContent = "Full Name";

  const fullNameInput = document.createElement("input");
  fullNameInput.type = "text";

  let btnCreate = document.createElement("button");
  btnCreate.textContent = "Add visit"

  modal.appendBody(selectDoctorHeader, selectDoctor, visitPurposeHeader, visitPurposeTextarea, visitDescriptionHeader, visitDescriptionTextarea, selectUrgencyHeader, selectUrgency, fullNameHeader, fullNameInput,
    bloodPressureDiv, bmiInput, previouslyDiseasesInput, ageHeader, ageInput, lastVisitHeader, lastVisitDateInput, // extras
    btnCreate)

  function renderFields() {
    let extras = [lowBloodPressureInput, highBloodPressureInput, bmiInput, previouslyDiseasesInput, ageInput, lastVisitDateInput]
    for (let extra of extras) {
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
        lastVisitDateInput.style.display = "block"
        break;
      case "therapist":
        ageInput.style.display = "block"
        break;
    }
  }
  selectDoctor.onchange = renderFields
  renderFields()

  return modal
}