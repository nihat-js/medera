
export default class Api {


  card = axios.create({
    baseURL: "https://ajax.test-danit.com/api/v2/cards",
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }
  })


  constructor(token) {
    this.token = token
  }



  static async login(email, password) {
    try {
      let response = await axios.post("https://ajax.test-danit.com/api/v2/cards/login", { email, password },)
      if (response.status.toString().startsWith('2')) {
        let token = response.data
        return true
      }
    } catch (err) {
      console.log('err')
    }
    return false
  }

  async getCards() {
    let resp = await this.card.request('/')
    console.log(resp)
  }
  add() {

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