var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/',function(req,res){
	console.log('get')
	res.send('got')

})

app.post('/',function(req,res){
        console.log(req.body)
	console.log('hit')
        res.send(req.body.email)
})

app.get('/weather',function(req,res){
	console.log('weather boiis')
	res.json({boii: 'weather boiis boiis'})
})

app.listen(80,()=> console.log("Server Online"))
