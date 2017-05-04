let fb = require('../../config/firebaseConfig')
let client = require('../../config/faceConfig')
let writeFile = require('../singleFunction/writeFile')

class CreateUser {

  constructor({machineId, firstName, lastName, filePath, file, email}){
    this._machineId = machineId
    this._email = email
    this._filePath = filePath
    this._file = file

    this._userData = {
      faceId : null,
      profile : {
        firstName : firstName,
        lastName : lastName
      },
      settings : {
        location : 'Philadelphia'
      }
    }

  }

  performAction() {
    let obj = this
 
    return new Promise(function (resolve, reject) {
      writeFile(obj)
      .then(function () {
        return createPerson(obj)
      })
      .then(function (obj) {
        return addToDatabase(obj)
      })
      .then(function () {
        resolve(null)
      })
      .catch(function (err) {
        reject(new Error(err))
      })
    })
  }
  
}

module.exports = CreateUser

let createPerson = function (obj) {
  let name = obj._userData.profile.firstName

  return new Promise (function (resolve, reject) {
    client.face.person.create(obj._machineId, name)
    .then(function(personInfo){
      obj._userData.faceId =  personInfo.personId
      return client.face.person.addFace(obj._machineId, personInfo.personId,{ path: obj._filePath})
    })
    .then(function () {
      return client.face.personGroup.trainingStart(obj._machineId)
    })
    .then(function() {
      resolve(obj)
    })
    .catch(function(err){
      reject(new Error(err))
    })
  })
}

let addToDatabase = function (obj) {
  let updates = {}
  updates['/crystalCubes/'+obj._machineId+'/user/'+obj._email] = obj._userData
  fb.database().ref().update(updates)
}



