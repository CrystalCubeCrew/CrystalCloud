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
  let query = fb.ref(`/crystalCubes/${obj.machineId}/user/${obj.userId}/contacts/`)
  return new Promise(function(resolve, reject){
    query.on('value',function(snapshot){
      let contacts = snapshot.val()
      if(contacts === null)
        reject(null)
        
      let foundContact = Object.values(contacts).filter(function(contact){
        return obj.person == contact.name
      })

      if(foundContact.length === 0)
        reject(null)
      resolve(foundContact[0].number)
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
