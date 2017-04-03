let express = require('express')
let app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/',function(req,res){
	console.log('get')
	res.send('got')

})

let routes = require('./app/routes')(app)

app.listen(3000,()=> console.log("Server Online"))
