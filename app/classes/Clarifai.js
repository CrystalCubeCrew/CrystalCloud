let app = require('../../config/clarifaiConfig')
let clarifai = require('clarifai')
let ImgUploader = require('./Cloudinary')

class Predicter {
    constructor({file, filePath}){
        this._file = file
        this._filePath = filePath
    }

    async performAction () {
        try{
            let image = new imageUploader(this)
            let url = await image.uploadFile()
            let findImage = await predict(url)
            console.log(findImage)
            return findImage
        }
        catch(err){
            console.log(err)
            return {error: `Error`}
        }
    }
}

module.exports = Predicter

function predict (url) {
    return new Promise(function(resolve,reject){
        app.models.predict(clarifai.GENERAL_MODEL, url)
        .then(function(response){
            resolve(response.outputs[0].model)
        })
        .catch(function(err){
            reject(err)
        })
    })
}
