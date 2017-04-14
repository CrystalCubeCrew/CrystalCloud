let formStrings = function (obj) {
  let string = ''

  Object.keys(obj).map(function(key){
    string = string + ' ' + obj[key] 
  })
  return string;
} 

module.exports = formStrings