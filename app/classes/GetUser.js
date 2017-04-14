let fb = require('../../config/firebaseConfig')
let client = require('../../config/faceConfig')
let writeFile = require('../singleFunction/writeFile')

class GetUser {
  constructor ({machineId, filePath,file}) {
    this._machineId = machineId
    this._filePath = filePath
    this._file = file
  }

  performAction() {
    return new Promise(function (resolve, reject) {
      writeFile(this)
      .then(function () {
        return findUser(this)
      })
      .then(function (userId) {
        return getUserFromDatabase(this,userId)
      })
      .then(function () {
        resolve({firstName: data.profile.firstName, lastName: data.profile.lastName})
      })
      .catch(function (err) {
        reject(new Error(err))
      })
    })
  }

}

module.exports = GetUser

let findUser = function (obj) {
  return new Promise(function (resolve, reject) {
    client.face.detect({
      path: obj._userFaceImg,
      returnFaceId: true
    })
    .then(function(userData) {
      if(userData.length > 0){
        let faces = [userData[0].faceId]
        return client.face.identify(faces, obj._machineId, 1, 0.4)
      }
      else
        reject(new Error('No user exist'))
    })
    .then(function (userData) {
       resolve(userData[0].candidates[0].personId)
    })
    .catch(function (err) {
      reject(new Error(err))
    })
  })
}

let getUserFromDatabase = function (obj,userId) {
  let userRef = fb.database().ref('/crystalCubes/'+obj._machineId+'/user/'+userId) 
  return new Promise(function (resolve,reject) {
    userRef.on('value',function (snapshot) {
      resolve(snapshot.val())
    })
  }) 
}