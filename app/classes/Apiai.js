let apiai = require('../../config/apiaiConfig')

class Apiai{

  constructor({speech}){
    this._speech = speech
  }

  getIntent(){
    return getIntent(this)
  }
}

let getIntent = function(obj){
  return new Promise(function () {
    let request = apiai.textRequest(obj._speech, {
       sessionId: '<unique session id>'  
    })
      request.on('response', function(response) {
          console.log(response);
      });

      request.on('error', function(error) {
          console.log(error);
      });

      request.end();
  })
}