import Api from "./Api.js"
import Auth from "./Auth.js"

export class Visit {
  #status = "open"
  #createdAt = Date.now()
  #parentDiv = null
  #showMoreBtn = null
  constructor({ id, doctor, purpose, description, urgency, fullName, }) {

    this.id = id // unknown
    this.doctor = doctor
    this.purpose = purpose
    this.description = description
    this.urgency = urgency
    this.fullName = fullName
    this.api = new Api(Auth.getToken())

  }

  static validate({ doctor, purpose, description, urgency, fullName }) {
    if (!doctor || !purpose || !description || !urgency || !fullName) {
      return false
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
      ...obj
    })
    return result
  }

  async save(obj) {
    return await this.api.saveCard({
      id : this.id,
      doctor: this.doctor,
      purpose: this.purpose,
      description: this.description,
      urgency: this.urgency,
      fullName: this.fullName,
      status: this.status,
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
    console.log('buuuu')
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
  }

}



export class VisitDentist extends Visit {
  constructor({ id, doctor, purpose, description, urgency, fullName, lastVisitDate }) {
    super({ id, doctor, purpose, description, urgency, fullName, })
    this.lastVisitDate = this.lastVisitDate
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
    this.age = this.age
  }

  async validate() {
    if (!this.age) return "Please fill age"
    if (this.age < 0 || this.age > 200) return "Please type  correct age"

  }
  async add() {
    return await super.addCard({
      age: this.age,
    })
  }

  async save(){
    return await super.save({
      age :this.age,
    })
  }


}