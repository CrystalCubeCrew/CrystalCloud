let weatherAPI = require('./weather')
let twilioAPI = require('./twilio')
let NewsAPI = require('./news')
let fb = require('./firebase')
let fs = require('fs')

let newUser = new fb.NewUser({machineId: '123', firstName: 'first', lastName: 'last'})
newUser.printUser()

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

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

  app.post('/saveFile',function (req,res) {
      let data = 'data:image/png;base64,' + req.body.file
      var imageBuffer = decodeBase64Image(data);
      fs.writeFile('test.jpg', imageBuffer.data, function(err) {
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
