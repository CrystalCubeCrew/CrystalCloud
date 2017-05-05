let client = require('../../config/faceConfig')
let machineName = 'crystal_chan_6'
// client.face.personGroup.delete(machineName)
// .then(function(data){
//     console.log(data)
//     client.face.create(machineName, machineName, null)
// })

// .catch(function(err){
//     console.log(err)
// })

 client.face.personGroup.create(machineName, machineName, null)
.then(function(){
    
})
.catch(function(err){
    console.log(err)
})