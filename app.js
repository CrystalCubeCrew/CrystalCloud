var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var weatherAPI = require('./app/weather')

app.use(bodyParser.json())

app.get('/',function(req,res){
	console.log('get')
	res.send('got')

})

app.post('/',function(req,res){
        console.log(req.body)
	console.log('hit')
        res.send(req.body.email)
})

app.get('/weather',function(req,res){
	let weather = new weatherAPI.Weather('19122')
	
  weather.getWeather()
  .then(function(data){
      return weather.setResponse(data)
    })
  .then(function(data){
    res.json({response: data})

  })
  .catch(function(err){
    res.end({error: 'There was an error getting the weather'})
  })
})

app.listen(3000,()=> console.log("Server Online"))
