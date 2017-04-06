let request = require('superagent')
let weatherConfig = require('../config/weatherConfig')

let formString = function (obj) {
  let string = ''

  Object.keys(obj).map(function(key){
    string = string + ' ' + obj[key] 
  })
  return string;
} 

class Weather {

  constructor (location) {

    this._location = location

  }

  setResponse (data) {
     return setResponse(data)
  }

  getWeather () {
    return getWeather(this)
  }
}

module.exports.Weather = Weather

let getWeather = function (obj) {
  return new Promise (function (resolve, reject) {
    request
    .get(weatherConfig.url)
    .query({appid: weatherConfig.appId})
    .query({units: weatherConfig.units})
    .query({zip: obj._location+',us'})
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
        place: 'The weather in ' + obj.name,
        degress: 'is ' + obj.main.temp + ' degree and',
        weather: obj.weather[0].description
      }

      return formStrings(out)
    }()
  )
}