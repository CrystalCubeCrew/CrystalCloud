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
  let name = obj._userData.profile.firstName +' '+ obj._userData.profile.lastName 

  return new Promise (function (resolve, reject) {
    client.face.person.create(obj._machineId, name)
    .then(function(personInfo){
      obj._userId =  personInfo.personId
      
      return Promise.all([
        client.face.person.addFace(obj._machineId, personInfo.personId,{ path: obj._userFaceImg}), 
        client.face.personGroup.trainingStart(obj._machineId)
      ])
    })
    .then(function(){
      resolve(obj)
    })
    .catch(function(err){
      reject(new Error(err))
    })
  })
}

let addToDatabase = function (obj) {
  let updates = {}
  updates['/machines/'+obj._machineId+'/'+obj._userId] = obj._userData
  fb.database().ref().update(updates)
}


