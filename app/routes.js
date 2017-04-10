let weatherAPI = require('./weather')
let twilioAPI = require('./twilio')
let NewsAPI = require('./news')
let CreateUser = require('./CreateUser')
let GetUser = require('./GetUser')
let fs = require('fs')

function decodeBase64Image(dataString) {
  let response = {}
  response.type = 'image/png';
  response.data = new Buffer(dataString, 'base64');

  return response;
}

module.exports = function (app,faceUpload) {

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
      throw err
      res.send({error: 'There was an error getting the weather'})
    })
  })


  app.get('/sendText/:userId/:person/:message',function(req,res){
    let holder = {
      to: '2158631018',
      body: 'test'
    }

    let messager = new twilioAPI.Messager(holder)

    messager.sendMessage()
    .then(function(){
      res.send('success')
    })
    .catch(function(){
      res.send('fail')
    })
  }) 

  app.get('/news',function(req,res){
      let nws = new NewsAPI('Sports')

      nws.getnews()
      .then(function(data){
        return nws.setResponse(data)
      })

      .then(function(data){
        res.json({response: data})
      })
      .catch(function(err){
        console.log(err)
        res.send('fail')
      })
  })

  app.post('/createUser', function(req,res){
    let imageBuffer = decodeBase64Image(req.body.file)
    let filePath = 'img/faces/'+req.body.fileName

    let holder = {
      machineId: req.body.machineId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      filePath: filePath
    }

    let newUser = new CreateUser (holder)

    fs.writeFile(filePath, imageBuffer.data, function(err) {
      if(err){
        console.log(err)
        res.end()
      }
      else{

        newUser.createPerson()
        .then(function (obj) {
          return newUser.addToDatabase(obj)
        })
        .then(function () {
          console.log('success')
          res.end()
        })
        .catch(function (err) {
          console.log(err)
          res.end()
        })
      }
    })
  })


  app.post('/findUser',function (req,res) { 
    let imageBuffer = decodeBase64Image(req.body.file);
    let filePath = 'img/faces/'+req.body.fileName

    let holder = {
      machineId: req.body.machineId,
      filePath: filePath
    }

    fs.writeFile(filePath, imageBuffer.data, function(err) {
      if(err){
        console.log(err)
      }
      else{
        let getUser = new GetUser(holder)

        getUser.findUser()
        .then(function(userId){
          return getUser.getUserFromDatabase(userId)
        })
        .then(function (data) {
          res.end({response: data}) 
        })
        .catch(function(err){
          console.log(err)
          res.end() 
        })
      }
    })
  })
}
