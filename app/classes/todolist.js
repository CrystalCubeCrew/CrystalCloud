let fb = require('../../config/firebaseConfig')
let db = fb.database()

class Todolist {

constructor(userid, machineid){

  this._userid = userid
  this._machineid = machineid
}

performAction(){
  let obj = this
  return new Promise(function (resolve,reject) {
    gettodolist(obj)
    .then(function(data){
        return setResponse(data)
      })
    .then(function (data) {
        resolve({response: data})
      })
      .catch(function(err){
        reject(new Error(err))
      })
    })
  }

}

module.exports = Todolist


//get userinfo,machineinfo and todolist
let gettodolist = function(obj){
   let userRef = fb.database().ref(`/crystalCubes/${obj._machineid}/user/${obj._userid}/todolist/`) 
   return new Promise(function (resolve,reject) {
     userRef.on('value',function (snapshot) {
       resolve(snapshot.val())
    })
  }) 
}

let setResponse = function(data){

  return Promise.resolve(
    function(){
      let list = []
      let i = 0;
      for(key in data){
        list.push(data[key].task)
        if(data[key] == null || i > 4){
          break;
        }
        ++i;
      }

      let response = list.reduce(function(acc, element){
        return acc +', '+ element 
      },'')

      return response
    }()
  )
} 


// db.ref('/sujen/todolist').on('value', function(snapshot){
//   var items = snapshot.val()
//    for(var item in items) {
//   	console.log(items[item].value)
//   }
//  })

//  addTodoItem = function(postData) {
//  Get a key for a new Post.
//    var newPostKey = db.ref('/sujen/todolist').push().key;

//  Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates = {};
//   updates[newPostKey] = postData;

//    return db.ref('/sujen/todolist').update(updates);
//  }











