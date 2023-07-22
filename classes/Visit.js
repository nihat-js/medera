import Api from "./Api.js"
import Auth from "./Auth.js"

export class Visit {
  #status = "open"
  #createdAt = Date.now()
  #parentDiv = null
  #showMoreBtn = null
  constructor({ doctor, purpose, description, urgency, fullName, }) {
    this.doctor = doctor
    this.purpose = purpose
    this.description = description
    this.urgency = urgency
    this.fullName = fullName

  }

  static validate({ doctor, purpose, description, urgency, fullName }) {
    if (!doctor || !purpose || !description || !urgency || !fullName) {
      return false
    }
    return true
  }



}

export class VisitCardiologist extends Visit {

  constructor({ doctor, purpose, description, urgency, fullName, lowBloodPressure, highBloodPressure, bmi, previouslyDiseases, age, }) {
    super({ doctor, purpose, description, urgency, fullName, })
    this.lowBloodPressure = lowBloodPressure
    this.highBloodPressure = highBloodPressure
    this.bmi = bmi
    this.previouslyDiseases = previouslyDiseases
    this.age = age
  }

  async save() {
    let api = new Api(Auth.getToken())
    let result = await api.addCard({
      doctor: this.doctor,
      purpose: this.purpose,
      description: this.description,
      urgency: this.urgency,
      fullName: this.fullName,
      lowBloodPressure: this.lowBloodPressure,
      highBloodPressure: this.highBloodPressure,
      bmi: this.bmi,
      previouslyDiseases: this.previouslyDiseases,
      age: this.age,
      status : this.status
    })
    return result
  }

  validate() {
  }

}



export class VisitDentist extends Visit {
  constructor({ doctor, purpose, description, urgency, fullName, lastVisitDate }) {
    super({ doctor, purpose, description, urgency, fullName, })
    this.lastVisitDate = this.lastVisitDate
  }
  async save() {
    let api = new Api(Auth.getToken())
    let result = await api.addCard({
      doctor: this.doctor,
      purpose: this.purpose,
      description: this.description,
      urgency: this.urgency,
      fullName: this.fullName,
      lastVisitDate: this.lastVisitDate,
      status : this.status
    })
    return result
  }
}

export class VisitTherapist extends Visit {
  constructor({ doctor, purpose, description, urgency, fullName, age }) {
    super({ doctor, purpose, description, urgency, fullName, })
    this.age = this.age
    status : this.status
  }

  async validate() {
    if (!this.age) return "Please fill age"
    if (this.age < 0 || this.age > 200) return "Please type  correct age"

  }
  async save() {
    let api = new Api(Auth.getToken())
    let result = await api.addCard({
      doctor: this.doctor,
      purpose: this.purpose,
      description: this.description,
      urgency: this.urgency,
      fullName: this.fullName,
      age: this.age,
      status : this.status
    })
    return result
  }
}