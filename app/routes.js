let ActionFactory = require('../factoryClass/ActionFactory')
let Apiai = require('./classes/Apiai')
let Save = require('./classes/SaveActivity')

module.exports = function (app) {

  app.post('/createUser', function(req,res){
    let holder = {
      machineId: req.body.machineId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      filePath: filePath
    }

    let action = new ActionFactory({intent: 'Create User', data: holder})

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
      filePath: `img/faces/${req.body.fileName}`
    }

    let action = new ActionFactory({intent: 'Get User', data: holder})

    action.performAction()
    .then(function(data){
      console.log(data)
      res.json(data)
    })
    .catch(function(err){
      console.log(err)
      res.json({error: 'Failed to find user'})
    })
  })


  app.post('/crystalRequest', function(req,res){
    let api = new Apiai(req.body)
    let sendData = {}

    api.getIntent()
    .then(function(data){
      sendData.intent = data.result.metadata.intentName
      sendData.data = data.result.parameters

      Object.assign(sendData, req.body)
      let action = new ActionFactory(sendData)
      return action.performAction()
    })
    .then(function(data){
      Object.assign(sendData, data)
      let save = new Save(sendData)
      return save.saveActivity()
    })
    .then(function(){
      res.json(sendData)
    })
    .catch(function(err){
      console.log(err)
      res.json({error: 'Request Failed'})

    })
  })

}
