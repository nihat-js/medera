export default  class Database {
  users = [
    {
      username: "admin",
      password: "admin"
    },
    {
      username: "nihat",
      password: "nihat-js"
    }
  ]


  getUsers() {
    return this.users
  }

  saveVisit(visit) {
    let visits = localStorage.getItem('visits')
    if (!visits) {
      visits = []
    }
    visits.unshift(visit)
  }

  getVisits() {
    return JSON.parse(localStorage.getItem('visits'))
  }



}