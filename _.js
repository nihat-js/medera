// static savedLogin(){
//   try {
//     let obj = JSON.parse(localStorage.getItem('credentials'))
//     if (!obj) return false
//     Api
//   }
// }

// static checkSavedCredentials() {
//   let username = obj.username
//   let password = obj.password
//   return Auth.checkCredentials(username, password)
// }

// static checkCredentials(username, password) {
//   let db = new Database()
//   let users = db.getUsers()
//   for (let user of Auth.users) {
//     if (user.username == username && user.password == password) {
//       return true
//     }
//   }
//   return false
// }

<form  class="create-visit-modal">
<h4> Select Doctor </h4>
<select class="doctor" id="">
  <option value="" disabled selected> Select Doctor </option>
  <option value="cardiologist" > Cardiologist</option>
  <option value="dentist"> Dentist</option>
  <option value="therapist"> Therapist</option>
</select>

<input type="number" class="low-blood-pressure" placeholder="Low blood pressure">
<input type="number" class="high-blood-pressure" placeholder="High blood pressure">

<input type="number" class="bmi" placeholder="Body Mass Index">

<input type="text" class="previously-diseases" placeholder="Previously diagnosed cardiovascular diseases">
<input type="number" class="age">

<input type="date" class="last-visit-date">


<h4 class="purpose">Visit purpose </h4>
<textarea class="purpose" name="" id="" cols="30" rows="3"></textarea>

<h4> Brief visit description </h4>
<textarea class="description" name="" id="" cols="30" rows="3"   ></textarea>

<h4> Select urgency levl </h4>
<select class="urgency" id="">
  <option value=""> normal </option>
  <option value=""> priority </option>
  <option value=""> urgent </option>
</select>

<h4 class="full-name"> Full Name </h4>
<input type="text" >
</form>