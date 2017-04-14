let fb = require('../config/firebaseConfig')
let client = require('../config/faceConfig')

class GetUser {

  constructor ({machineId, filePath}) {
    this._machineId = machineId
    this._userFaceImg = filePath
  }

  findUser () {
    return findUser(this)
  }

  getUserFromDatabase (id) {
    return getUserFromDatabase(this, id)
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
      console.log(userData)
      if(userData.length > 0){
        var faces = [userData[0].faceId];
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