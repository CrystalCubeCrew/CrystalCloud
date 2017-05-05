let fb = require('../../config/firebaseConfig') 
let db = fb.database()

class Save {
  constructor({intent, response, userId, machineId}){
    this._intent = intent
    this._message = response
    this._userId = userId
    this._machineId = machineId
  }

  saveActivity () {
    let obj = this
    saveActivity(obj)
    .then(function(){
      return Promise.resolve(obj)
    })
  }
}

module.exports = Save

let saveActivity = function(obj){
  return new Promise (function(resolve, reject){
    let key = db.ref().child(`/crystalCubes/${obj._machineId}/user/${obj._userId}/logs`).push().key

    db.ref(`/crystalCubes/${obj._machineId}/user/${obj._userId}/logs/${key}`).set({
      intent: obj._intent,
      message : obj._message,
      date : new Date().toString(),
      speaker : 'Crystal'
    })
    
    resolve(null)
  }) 
}




