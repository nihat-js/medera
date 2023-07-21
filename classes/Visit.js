import Api from "./Api.js"
import Auth from "./Auth.js"

export class Visit {
  #showMore = false
  #status = "open"
  #createdAt = Date.now()
  #parentDiv = null
  #showMoreBtn = null
  constructor({ doctor, purpose, description, urgency, fullName,  }) {
    this.doctor = doctor
    this.purpose = purpose
    this.description = description
    this.urgency = urgency
    this.fullName = fullName

  }

  handleShwoMore() {
    let fields = this.parentDiv.querySelectorAll('.extra-fields')
    if (this.showMore) {
      for (let field of fields) {
        field.style.display = 'none'
      }
      this.#showMoreBtn.innerText = "Show More"
    } else {
      for (let field of fields) {
        field.style.display = 'block'
      }
      this.showMoreBtn.innerText = "Show Less"
    }
    this.showMore = !this.showMore
  }

  render() {
    let div = document.createElement("div")
    div.classList = "box"
    for (let key in this) {
      let h3 = document.createElement("h3")
      h3.innerText = `${key} :  ${this.key} `
      let isExtra = key != "fullName" && key != "doctor"
      h3.classList.add(key)
      if (isExtra) {
        h3.classList.add("extra-fields")
        h3.style.display = "none"
      }
      div.appendChild(h3)
    }

    let showMoreBtn = document.createElement("button")
    showMoreBtn.classList = "btn btn-show-more"
    showMoreBtn.textContent = "Show more"
    showMoreBtn.onclick = this.handleShwoMore.bind(this)
    this.showMoreBtn = showMoreBtn

    div.appendChild(showMoreBtn)
    this.parentDiv = div
    return div
  }



}

export class VisitCardiologist extends Visit {

  constructor({ doctor, purpose, description, urgency, fullName, lowBloodPressure, highBloodPressure, bmi, previouslyDiseases, age, }) {
    super({doctor, purpose, description, urgency, fullName,})
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
      age: this.age
    })
    return result
  }

}



export class VisitDentist extends Visit {
  constructor({ doctor, purpose, description, urgency, fullName, lastVisitDate }) {
    super({doctor, purpose, description, urgency, fullName,})
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
    })
    return result
  }
}

export class VisitTherapist extends Visit {
  constructor({ doctor, purpose, description, urgency, fullName, age }) {
    super({doctor, purpose, description, urgency, fullName,})
    this.age = this.age

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
    })
    return result
  }
}