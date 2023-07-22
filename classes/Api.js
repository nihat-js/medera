
export default class Api {



  constructor(token) {
    this.token = token
    this.card = axios.create({
      baseURL: "https://ajax.test-danit.com/api/v2/cards/",
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    })
  }



  static async login(email, password) {
    try {
      let response = await axios.post("https://ajax.test-danit.com/api/v2/cards/login", { email, password },)
      if (response.status.toString().startsWith('2')) {
        let token = response.data
        return token
      }
    } catch (err) {
      console.log('err')
    }
    return false
  }

  async getCards() {
    let res = await this.card.get('/')
    if (res.status.toString().startsWith('2')) {
      return res.data
    }
    return false
  }

  async addCard(obj) {
    let res = await this.card.post('', obj)
    if (res.status.toString().startsWith(2)) {
      return res.data
    }
    return false
  }

  async saveCard(obj) {
    return await this.card.put(obj.id.toString(), obj)
  }

  async deleteCard(id) {
    let res = await this.card.delete(id.toString())
    if (res.status.toString().startsWith(2)) {
      return true
    }
    return false
  }




  token = "0838189e-a3c8-426c-a6fd-43ada37ad559"



}


// body: JSON.stringify({
//   title: 'Визит к кардиологу',
//   description: 'Плановый визит',
//   doctor: 'Cardiologist',
//   bp: '24',
//   age: 23,
//   weight: 70
// })