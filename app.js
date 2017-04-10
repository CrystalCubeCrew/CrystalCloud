let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let multer = require('multer')

app.use(bodyParser.urlencoded({limit: '1mb',extended: true}))
app.use(bodyParser.json({limit: '1mb'}))

let faceContainer = multer.diskStorage({
  destination:'./img/faces',
  filename: function(req,file,cb){
    cb( null, file.originalname+'.png' );

  }
});

let faceUpload = multer({ storage: faceContainer})

let routes = require('./app/routes')(app, faceUpload)

app.listen(3000,()=> console.log("Server Online"))
//app.listen(80,()=> console.log("Server Online"))
