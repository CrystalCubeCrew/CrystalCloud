let weatherAPI = require('./weather')
let twilioAPI = require('./twilio')
let NewsAPI = require('./news')

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

  app.post('/saveFile',faceUpload.single('file'),function (req,res) {
      res.end() 
  })

  app.post('/post', function (req,res) {
    console.log(req.body)
    res.end()

  })

  }
