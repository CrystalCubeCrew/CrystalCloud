let express = require('express')
let app = express()
let bodyParser = require('body-parser')
app.use(bodyParser.json())

let routes = require('./app/routes')(app)

//app.listen(3000,()=> console.log("Server Online"))
app.listen(80,()=> console.log("Server Online"))
