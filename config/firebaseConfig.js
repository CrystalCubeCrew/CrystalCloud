var admin = require("firebase-admin");

var serviceAccount = require("./chet_db_key.json")


function configFb () {

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "https://crystalcube11-174d6.firebaseio.com"
    databaseURL: "https://crystal-99551.firebaseio.com/"
  })

}


module.exports = configFb()


