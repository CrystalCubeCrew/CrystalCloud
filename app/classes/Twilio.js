var twilio = require('../../config/twilioConfig')

class Messager {
  constructor ({to, any}) {
    this.to = to  
    this.from = '8563734007'
    this.body = any[1]
  }

  performAction(){
    return sendMessage(this)
  }
}

module.exports = Messager

let sendMessage = function(obj){
  return new Promise(function(resolve, reject){
    twilio.messages.create(obj,function(err){
      (err || obj.to === null || obj.body === null)
      ? reject(new Error(err))
      : resolve(true) 
    })
  })
}
