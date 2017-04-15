let ActionFactory = require('../factoryClass/ActionFactory')
let Apiai = require('./classes/Apiai')

module.exports = function (app) {
  // app.get('/sendText/:userId/:person/:message',function(req,res){
  //   let holder = {
  //     to: '2158631018',
  //     body: 'test'
  //   }

  //   let messager = new twilioAPI.Messager(holder)

  //   messager.sendMessage()
  //   .then(function(){
  //     res.send('success')
  //   })
  //   .catch(function(){
  //     res.send('fail')
  //   })
  // }) 


  app.post('/createUser', function(req,res){
    let holder = {
      machineId: req.body.machineId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      filePath: filePath
    }

    let action = new ActionFactory('Create User', holder)

    action.performAction()
    .then(function(){
      console.log('user created')
      res.end()
    })
    .catch(function(){
      console.log('failed to create user')
      res.end()
    })
  })


  app.post('/findUser',function (req,res) { 
    let holder = {
      file: req.body.file,
      machineId: req.body.machineId,
      filePath: `img/faces/ ${req.body.fileName}`
    }

    let action = new ActionFactory('Get User', holder)

    action.performAction()
    .then(function(data){
      console.log(data)
      res.json(data)
    })
    .catch(function(err){
      console.log(err)
      res.json({error: 'Failed to add user'})
    })
  })


  app.post('/crystalRequest', function(req,res){
    let api = new Apiai(req.body)
    let intent = null

    api.getIntent()
    .then(function(data){
      intent = data.result.metadata.intentName
      let parameters = data.result.parameters
      console.log(parameters)
      let action = new ActionFactory(intent,parameters)

      return action.performAction()
    })
    .then(function(data){
      data['intent'] = intent
      res.json(data)
    })
    .catch(function(err){
      res.json(err)
    })
  })

}
