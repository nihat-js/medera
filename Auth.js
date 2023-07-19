export default class Auth {
  static users = [
    {
      username: "admin",
      password: "admin"
    },
    {
      username: "nihat",
      password: "nihat-js"
    }
  ]

  static checkSavedCredentials() {
    let obj = JSON.parse(localStorage.getItem('credentials'))
    if (!obj) return false
    let username = obj.username
    let password = obj.password
    return Database.checkCredentials(username,password)
  }

  static checkCredentials(username, password) {
    for (let user of Database.users) {
      if (user.username == username && user.password == password) {
        return true
      }
    }
    return false
  }



}

