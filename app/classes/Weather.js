let request = require('superagent')
let weatherConfig = require('../../config/weatherConfig')
let formStrings = require('../singleFunction/formString')

class Weather {

  constructor (obj) {
    this._location = obj.Location 
      || obj['geo-state-us'] 
      || obj['geo-city'] 
      ||'Philadelphia'
  }

  performAction(){
    let obj = this
    return new Promise(function (resolve,reject) {
      getWeather(obj)
      .then(function(data){
        return setResponse(data)
      })
      .then(function (data) {
        resolve({response: data})
      })
      .catch(function(err){
        reject(new Error(err))
      })
    })
  }

}

module.exports = Weather

let getWeather = function (obj) {
  return new Promise (function (resolve, reject) {
    request
    .get(weatherConfig.url)
    .query({appid: weatherConfig.appId})
    .query({units: weatherConfig.units})
    .query({q: obj._location+',us'})
    .end(function(err, res){
     (err || !res.ok)
      ? reject(new Error(err))
      : resolve(res) 
   })
  })
}

let setResponse = function(data) {
  
  return Promise.resolve(
    function(){
      let obj = JSON.parse(data.text)

      let out = {
        degress: `Its ${obj.main.temp} degree and`,
        weather: obj.weather[0].description,
        place: `in ${obj.name}`
        
      }

      return formStrings(out)
    }()
  )
}