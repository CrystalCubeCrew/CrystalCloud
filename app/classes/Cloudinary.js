let cloudinary = require('../../config/cloudinaryConfig')
let writeFile = require('../singleFunction/writeFile')

class ImgUploader {
    constructor ({_file, _filePath}) {
        this._file = _file
        this._filePath = _filePath
    }

    async uploadFile () {
        let obj = this
        return new Promise(function(resolve, reject){
            Promise.all([writeFile(obj), uploadFile(obj)])
            .then(function(response){
                resolve(response[1].url)
            })
            .catch(function(err){
                reject(err)
            })
        }) 
    }
}

module.exports = ImgUploader

function uploadFile (obj) {
    return new Promise(function(resolve,reject){
        cloudinary.uploader.upload(obj._filePath, function(result) {
            if(result.error)
                reject(result.error)
            resolve(result) 
         });
    }) 
}



