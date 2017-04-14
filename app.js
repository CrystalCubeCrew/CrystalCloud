let express = require('express')
let app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({limit: '1mb',extended: true}))
app.use(bodyParser.json({limit: '1mb'}))


let routes = require('./app/routes')(app)

app.listen(3000,()=> console.log("Server Online"))
//app.listen(80,()=> console.log("Server Online"))
