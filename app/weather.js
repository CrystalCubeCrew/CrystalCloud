Object.prototype.formString = function () {
  let obj = this
  let string = ''

  Object.keys(obj).map(function(key){
    string = string + ' ' + obj[key] 
  })
  return string;
} 

var request = require('superagent')

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
    .get('http://api.openweathermap.org/data/2.5/weather')
    .query({appid: '978b69b401d80f55d0d84abd9bbbe6f6'})
    .query({units: 'imperial'})
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

      return out.formString()
  }()
  )
}