var twilio = require('../config/twilioConfig')

class Messager {
  constructor ({to, body} = {}) {
    this.to = to
    this.from = '8563734007'
    this.body = body
  }

  sendMessage () {
    return sendMessage(this)
  }
}

module.exports.Messager = Messager

let sendMessage = function(obj){
  return new Promise(function(resolve, reject){
    twilio.messages.create(obj,function(err){
      (err)
      ? reject(new Error(err))
      : resolve(true) 
    })
  })
}
