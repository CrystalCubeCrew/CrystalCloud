let weatherAPI = require('./weather')
let twilioAPI = require('./twilio')
let NewsAPI = require('./news')
let CreateUser = require('./CreateUser')
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
    var imageBuffer = decodeBase64Image(req.body.file)
    var filePath = '/img/faces/'+req.body.fileName

    var holder = {
      machineId: 'placeHolder-1',
      firstName: 'John',
      lastName: 'Hoe',
      filePath: filePath
    }

    let newUser = new CreateUser (holder)

    fs.writeFile(fileName, imageBuffer.data, function(err) {
      if(err){
        console.log(err)
        res.end()
      }
      else{

        newUser.createPerson()
        .then(function (obj) {
          return newUser.addtoDatabase(obj)
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


  app.post('/saveFile',function (req,res) { 
    var imageBuffer = decodeBase64Image(req.body.file);
    fs.writeFile('test.png', imageBuffer.data, function(err) {
      if(err){
        console.log(err)
      }
      else{
        console.log('done son')
      }
      res.end() 
    });
  })


  app.post('/post', function (req,res) {
    console.log(req.body)
    res.end()

  })

  app.post('/create/user',function(req,res){

  })

  }
