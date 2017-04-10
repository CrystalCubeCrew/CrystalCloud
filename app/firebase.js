// let fb = require('../config/firebaseConfig')
// let userRef = fb.database().ref() 
// let data = userRef.child('machine').push().key
// console.log(data)

// let holder = {
//   data: 'poop'
// }

// let updates = {}
// updates['/machine/-KhFWD_vKVdF9mqriIIS/activity/'+ data] = holder


// fb.database().ref().update(updates)

// userRef.on('value',function (snapshot) {
//   console.log(snapshot.val())
// })


class NewUser {

  constructor({machineId, firstName, lastName} = {}){
    this._machineId = machineId
    this._userId = null
    this._userFaceImg = null

    this._userData = {
      profile : {
        firstName : firstName,
        lastName : lastName
      },
      settings : {
        location : 'Philadelphia'
      }
    }
  }

  printUser() {
    console.log(this)
  }
}

class FindUser {

  constructor(userId){
    this._userId = userId
    this._userData =  null
  }

  set userData(data){
    this._userData = data
  }

  
}

module.exports.NewUser = NewUser


