let chai = require('chai')
let chaiHttp = require('chai-http')
var server = require('../app.js')
var should = chai.should()

chai.use(chaiHttp)

describe('testing for Crystal Cloud', function(){
    it('Should get news on technology',function(done){
        chai.request(server)
        .post('/crystalRequest')
        .send({"speech": "What is the news in Technology"})
        .end(function(err,res){
            res.should.have.status(200)
            res.should.be.json
            res.body.should.be.a('object');
            res.body.should.have.property('intent')
            done()
        })
    })
    it('Should get weather in Philadelphia',function(done){
        chai.request(server)
        .post('/crystalRequest')
        .send({"speech": "What is the weather in philadelphia"})
        .end(function(err,res){
            res.should.have.status(200)
            res.should.be.json
            res.body.should.be.a('object');
            res.body.should.have.property('intent');
            done()
        })
    })
    it('Should get play rock music',function(done){
        chai.request(server)
        .post('/crystalRequest')
        .send({"speech": "Play rock"})
        .end(function(err,res){
            res.should.have.status(200)
            res.should.be.json
            res.body.should.be.a('object');
            res.body.should.have.property('intent');
            done()
        })
    })
    it('Should get math operation of 2 + 2',function(done){
        chai.request(server)
        .post('/crystalRequest')
        .send({"speech": "What is 2 + 2"})
        .end(function(err,res){
            res.should.have.status(200)
            res.should.be.json
            res.body.should.be.a('object');
            res.body.should.have.property('intent');
            done()
        })
    })
    it('Should send text to day saying hello',function(done){
        chai.request(server)
        .post('/crystalRequest')
        .send({
            "speech": "Text dad hello",
            "userId" : "ff629b29-9e3a-4de3-9304-2bf209dd9c39",
            "machineId" : "crystal_chan_6"
         })
        .end(function(err,res){
            res.should.have.status(200)
            res.should.be.json
            res.body.should.be.a('object');
            res.body.should.have.property('intent');
            done()
        })
    })
    it('Should get my todo list',function(done){
        chai.request(server)
        .post('/crystalRequest')
        .send({
            "speech": "What's on my todo list",
            "userId" : "ff629b29-9e3a-4de3-9304-2bf209dd9c39",
            "machineId" : "crystal_chan_6"
         })
        .end(function(err,res){
            res.should.have.status(200)
            res.should.be.json
            res.body.should.be.a('object');
            res.body.should.have.property('intent');
            done()
        })
    })
})