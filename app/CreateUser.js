let fb = require('../config/firebaseConfig')
let client = require('../config/faceConfig')
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


class CreateUser {

  constructor({machineId, firstName, lastName, filePath} = {}){
    this._machineId = machineId
    this._userId = null
    this._userFaceImg = filePath

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

  set userId(id) {
    this._userId = id
  }

  createPerson () {
    return createPerson(this) 
  }


  addToDatabase (obj) {
    return addToDatabase(obj)  
  }

}

module.exports = CreateUser

let createPerson = function (obj) {
  let name = obj._userData.profile.firstName

  return new Promise (function (resolve, reject) {
    client.face.person.create(obj._machineId, name)
    .then(function(personInfo){
      obj._userId =  personInfo.personId
      return client.face.person.addFace(obj._machineId, personInfo.personId,{ path: obj._userFaceImg})
    })
    .then(function () {
      return client.face.personGroup.trainingStart(obj._machineId)
    })
    .then(function() {
      resolve(obj)
    })
    .catch(function(err){
      console.log(err)
      reject(new Error(err))
    })
  })
}

let addToDatabase = function (obj) {
  let updates = {}
  updates['/crystalCubes/'+obj._machineId+'/user/'+obj._userId] = obj._userData
  fb.database().ref().update(updates)
}

