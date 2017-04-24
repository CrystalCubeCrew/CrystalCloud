let twilio = require('../../config/twilioConfig')
let fb = require('../../config/firebaseConfig').database()

class Messager {
  constructor ({data, userId, machineId}) {
    this.person = data.any[0].toLowerCase()
    this.to = null  
    this.from = '8563734007'
    this.body = data.any[1]
    this.userId = userId
    this.machineId = machineId
  }

  performAction(){
    let obj = this

    return new Promise (function(resolve, reject){
      getContact(obj)
      .then(function(data){
        obj.to = data
        return sendMessage(obj)
      })
      .then(function(data){
        resolve({response: data})
      })
      .catch(function(){
        reject(null)
      })
    })
  }
}

module.exports = Messager

let getContact = function(obj){
  console.log(obj)
  let query = fb.ref(`/crystalCubes/${obj.machineId}/user/${obj.userId}/contacts/${obj.person}`)
  return new Promise(function(resolve, reject){
    query.on('value',function(snapshot){
      if(snapshot.val() == null)
        reject(null)
      console.log(snapshot.val())
      resolve(snapshot.val())
    })
  })
}

let sendMessage = function(obj){
  return new Promise(function(resolve, reject){
    twilio.messages.create(obj,function(err){
      (err || obj.to === null || obj.body === null)
      ? reject(new Error(err))
      : resolve(`messaged ${obj.person} ${obj.body}`) 
    })
  })
}
