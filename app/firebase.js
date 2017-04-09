let fb = require('../config/firebaseConfig')
let userRef = fb.database().ref() 
let data = userRef.child('machine').push().key
console.log(data)

let holder = {
  data: 'poop'
}

let updates = {}
updates['/machine/-KhFWD_vKVdF9mqriIIS/activity/'+ data] = holder


fb.database().ref().update(updates)

userRef.on('value',function (snapshot) {
  console.log(snapshot.val())
})
