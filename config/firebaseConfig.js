var admin = require("firebase-admin");

var serviceAccount = require("./crystalcube11-174d6-firebase-adminsdk-vq3p3-5f1d170884.json")


function configFb () {

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://crystalcube11-174d6.firebaseio.com"
    
  })

}


module.exports = configFb()


