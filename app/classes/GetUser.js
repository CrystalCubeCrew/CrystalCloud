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
    let obj = this
   
    return new Promise(function (resolve, reject) {
      writeFile(obj)
      .then(function () {
        return findUser(obj)
      })
      .then(function (userId) {
        return getUserFromDatabase(obj,userId)
      })
      .then(function (data) {
        resolve({firstName: data.userName.profile.firstName, lastName: data.userName.profile.lastName, userId: data.userId})
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
      path: obj._filePath,
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

let getUserFromDatabase = function (obj,faceId) {
  let userRef = fb.database().ref('/crystalCubes/'+obj._machineId+'/user/') 
  return new Promise(function (resolve,reject) {
    userRef.on('value',function (snapshot) {
      let users = snapshot.val()
      console.log(faceId)
      let foundUser = Object.values(users).filter(function(user){
        return user.faceId === faceId
      })
      console.log(foundUser)
      resolve({
        userName: foundUser[0],
        userId: foundUser[0]
      })

    })
  }) 
}