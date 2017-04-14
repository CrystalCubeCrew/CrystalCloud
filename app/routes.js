let ActionFactory = require('../factoryClass/ActionFactory')

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

    action.preFormAction()
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

    action.preFormAction()
    .then(function(data){
      console.log(data)
      res.send(data)
    })
    .catch(function(err){
      console.log(err)
      res.send({error: 'Failed to add user'})
    })
  })


  app.post('/crystalRequest', function(req,res){
    console.log(req.body)
    res.end()
  })

}
