let fb = require('../config/firebaseConfig')
let userRef = fb.database().ref() 
let data = userRef.child('001').push().key
// console.log(data)

// let holder = {
//   crystal_says: 'hello'
// }

// let updates = {}
// updates['/users/001/log/002'] = holder

// fb.database().ref().update(updates)

fb.database().ref('/users/001/log-KhEqFR5o2MHmIP5RJvb').remove()
userRef.on('value',function (snapshot) {
  console.log(snapshot.val())
})
