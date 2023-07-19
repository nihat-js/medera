export class Visit {
  constructor({ doctor, purpose, description, urgency, fullName, }) {
    this.doctor = doctor
    this.purpose = purpose
    this.description = description
    this.urgency = urgency
    this.fullName = fullName

    this.lastVisitDate = lastVisitDate
    this.status = "open"
  }
}

export class VisitCardiologist extends Visit {
  constructor({ doctor, purpose, description, urgency, fullName,  lowBloodPressure, highBloodPressure, bmi, previouslyDiseases, age, }) {
    super(doctor, purpose, description, urgency, fullName,)
    this.lowBloodPressure = lowBloodPressure
    this.highBloodPressure = highBloodPressure
    this.bmi = bmi
    this.previouslyDiseases = previouslyDiseases
    this.age = age
  }
}



export class VisitDentist extends Visit {
  constructor({ doctor, purpose, description, urgency, fullName, lastVisitDate }) {
    super(doctor, purpose, description, urgency, fullName,)
    this.lastVisitDate = this.lastVisitDate
  }
}

export class VisitTherapist extends Visit {
  constructor({ doctor, purpose, description, urgency, fullName, lastVisitDate }) {
    super(doctor, purpose, description, urgency, fullName,)
    this.age  = this.age
  }
}