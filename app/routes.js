let ActionFactory = require('../factoryClass/ActionFactory')
let Apiai = require('./classes/Apiai')
let Save = require('./classes/SaveActivity')

module.exports = function (app) {

  app.post('/createUser', function(req,res){
    let holder = {
      machineId: req.body.machineId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      filePath: `img/faces/${req.body.fileName}`,
      file : req.body.file,
      email : req.body.gmail
    }

    let action = new ActionFactory({intent: 'Create User', data: holder})

    action.performAction()
    .then(function(){
      res.end()
    })
    .catch(function(err){
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
      res.json(data)
    })
    .catch(function(err){
      res.json({error: 'Failed to find user'})
    })
  })


  app.post('/crystalRequest', function(req,res){
    console.log('request made')
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
      res.json({error: 'Request Failed'})

    })
  })


  app.post('/checkImage',function(req,res){
    let holder = {
      filePath: `img/faces/${req.body.fileName}`,
      file : req.body.file
    }

    let action = new ActionFactory({intent: 'check image', data: holder})
    action.performAction()
    .then(function(out){
      res.json({response: out})
    })
    .catch(function(err){
      res.json({response: 'no hand'})
    })
  })

}
