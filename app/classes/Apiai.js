let apiai = require('../../config/apiaiConfig')

class Apiai{

  constructor({speech}){
    this._speech = speech
  }

  getIntent(){
    return getIntent(this)
  }
}

module.exports = Apiai

let getIntent = function(obj){
  return new Promise(function (resolve, reject) {
    let request = apiai.textRequest(obj._speech, {
       sessionId: '<unique session id>'  
    })
      request.on('response', function(response) {
          resolve(response);
      });

      request.on('error', function(error) {
          reject(new Error(error));
      });

      request.end();
  })
}