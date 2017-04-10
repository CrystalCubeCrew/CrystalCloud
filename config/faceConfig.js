let oxford = require("project-oxford");
let client = new oxford.Client('7fe6ec1e951f4f838c0f5d8e0dc495e1')

module.exports = client

// client.face.personGroup.create('placeholder-1','placeholder-1')
// .then(function(){
//   console.log('created group')
//   return client.face.person.list('placeholder-1')
// })
// .then(function(response){
//   console.log(response)
// })
// .catch(function(err){
//   console.log(err)
// })