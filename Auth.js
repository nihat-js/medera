import Database from './Database.js';
export default class Auth {
  static logout() {
    localStorage.setItem('credentials', null)
  }
  static getToken() {
    try {
      let object = JSON.parse(localStorage.credentials)
      if (object?.token) {
        return object.token
      }
    } catch (e) {
      localStorage.credentials = null
      console.log("Error parsing credentials", e)
    }
    return false
  }
  static setToken(token) {
    try {
      let object = JSON.parse(localStorage.credentials)
      if (object) {
        object = { token, ...object }
      } else {
        object = { token }
      }
      localStorage.setItem('credentials', JSON.stringify(object))
    } catch (e) {
      console.log("Error parsing credentials", e)
    }
    return false
  }
}

