let fs = require('fs')

let decodeBase64Image = function(dataString) {
  let response = {}
  response.type = 'image/png';
  response.data = new Buffer(dataString, 'base64');

  return response;
}

let writeFile = function (obj) {
  return new Promise(function (resolve, reject) {
      let imageBuffer = decodeBase64Image(obj._file)

      fs.writeFile(obj._filePath, imageBuffer.data,function(err){
        (err)
        ? reject(new Error(err))
        : resolve(null)
      })
  }) 
}

module.exports = writeFile


