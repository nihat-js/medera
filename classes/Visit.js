import Api from "./Api.js"
import Auth from "./Auth.js"

export class Visit {
  constructor({ id, doctor, purpose, description, urgency, fullName, }) {
    this.status = "open"
    this.createdAt = new Date().toLocaleDateString()
    this.id = id // can be undefined 
    this.doctor = doctor
    this.purpose = purpose
    this.description = description
    this.urgency = urgency
    this.fullName = fullName
    this.api = new Api(Auth.getToken())

  }

  static validate({ doctor, purpose, description, urgency, fullName }) {
    fullName = fullName.trim()
    if (!doctor || !purpose || !description || !urgency || !fullName) {
      return "Fill all fields"
    }
    if (fullName.split(' ').length < 2 || fullName.split(' ').length > 4) {
      return "Full name must be at least 2 words and maximum 4 words "
    }
    return true
  }

  async add(obj) {
    let result = await this.api.addCard({
      doctor: this.doctor,
      purpose: this.purpose,
      description: this.description,
      urgency: this.urgency,
      fullName: this.fullName,
      status: this.status,
      createdAt : this.createdAt, 
      ...obj
    })
    return result
  }

  async save(obj) {
    return await this.api.saveCard({
      id: this.id,
      doctor: this.doctor,
      purpose: this.purpose,
      description: this.description,
      urgency: this.urgency,
      fullName: this.fullName,
      status: this.status,
      createdAt : this.createdAt,
      lastUpdatedAt : new Date().toLocaleDateString(),
      ...obj
    })
  }



}

export class VisitCardiologist extends Visit {

  constructor({ id, doctor, purpose, description, urgency, fullName, lowBloodPressure, highBloodPressure, bmi, previouslyDiseases, age, }) {
    super({ id, doctor, purpose, description, urgency, fullName, })
    this.lowBloodPressure = lowBloodPressure
    this.highBloodPressure = highBloodPressure
    this.bmi = bmi
    this.previouslyDiseases = previouslyDiseases
    this.age = age
  }

  async add() {
    let result = await super.add({
      lowBloodPressure: this.lowBloodPressure,
      highBloodPressure: this.highBloodPressure,
      bmi: this.bmi,
      previouslyDiseases: this.previouslyDiseases,
      age: this.age,
    })
    return result
  }

  async save() {
    return await super.save(this.id, {
      lowBloodPressure: this.lowBloodPressure,
      highBloodPressure: this.highBloodPressure,
      bmi: this.bmi,
      previouslyDiseases: this.previouslyDiseases,
      age: this.age,
    })
  }

  validate() {
    console.log(this.lowBloodPressure ,  this.highBloodPressure , this.bmi ,  this.previouslyDiseases)
    if (!this.lowBloodPressure || !this.highBloodPressure || !this.bmi || !this.previouslyDiseases || !this.age) return 'Fill the fields'
    if (this.lowBloodPressure < 20 || this.lowBloodPressure > 300) return "Type correct low blood pressure"
    if (this.highBloodPressure < 20 || this.highBloodPressure > 400) return "Type correct high blood pressure"

    if (this.age < 0 || this.age > 160) return "Type correct age"

    return true

  }

}



export class VisitDentist extends Visit {
  constructor({ id, doctor, purpose, description, urgency, fullName, lastVisitDate }) {
    super({ id, doctor, purpose, description, urgency, fullName, })
    this.lastVisitDate = lastVisitDate
  }

  validate() {
    if (!this.lastVisitDate) return "Fill last visit date"
    if ( new Date(this.lastVisitDate).getTime() > Date.now()) {
      return "Last visit date must be before future"
    }
    return true
  }

  async add() {
    let result = await super.add({
      lastVisitDate: this.lastVisitDate,
    })
    return result
  }

  async save() {
    return await super.save(this.id, {
      lowBloodPressure: this.lowBloodPressure,
      highBloodPressure: this.highBloodPressure,
      bmi: this.bmi,
      previouslyDiseases: this.previouslyDiseases,
      age: this.age,
    })
  }
}

export class VisitTherapist extends Visit {
  constructor({ id, doctor, purpose, description, urgency, fullName, age }) {
    super({ id, doctor, purpose, description, urgency, fullName, })
    this.age = age
  }

  validate() {
    console.log(this.age)
    if (!this.age) return "Please fill age"
    if (this.age < 0 || this.age > 160) return "Please type  correct age"
    return true
  }
  async add() {
    return await super.add({
      age: this.age,
    })
  }

  async save() {
    return await super.save({
      age: this.age,
    })
  }


}