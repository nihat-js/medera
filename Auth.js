import Database from './Database.js';
export default class Auth {

  static checkSavedCredentials() {
    let obj = JSON.parse(localStorage.getItem('credentials'))
    if (!obj) return false
    let username = obj.username
    let password = obj.password
    return Auth.checkCredentials(username,password)
  }

  static checkCredentials(username, password) {
    let db= new Database()
    let users = db.getUsers()
    for (let user of Auth.users) {
      if (user.username == username && user.password == password) {
        return true
      }
    }
    return false
  }



}

