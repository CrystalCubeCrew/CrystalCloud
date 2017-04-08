let request = require('superagent') 
let newsConfig = require('../config/newsConfig')

let formStrings = function (obj) {
  let string = ''

  Object.keys(obj).map(function(key){
    string = string + ' ' + obj[key] 
  })
  return string;
} 


class News{
	
	constructor (Catalog){
			this.Catalog =Catalog 
			this.begindate ='20170101'
			this.fl = 'headline,lead_paragraph'
	}

	getnews(){
		return getnews(this)
	}

	setResponse(data){
		return setResponse(this,data)
	}
}
		
module.exports = News

let getnews = function(obj){

	return new Promise(function(resolve, reject){
		request
		.get(newsConfig.url)
		.query({'api-key': newsConfig.appId})
		.query({'q':obj.Catalog})
		.query({'begin_date': obj.begindate})
		.query({'fl': obj.fl})
		.end(function(err, res){
			(err || !res.ok)
			? reject(new Error(err))
            : resolve(res)
        })
    })
}

let setResponse = function(obj,data){

	return Promise.resolve(
		function(){
			let objData = JSON.parse(data.text)
			objData = objData.response
			
			let out = {
				category: 'In todays top news in ' + obj.Catalog,
				headline:'is ' +objData.docs[0].headline.print_headline,
				paragraph:objData.docs[0].lead_paragraph
			}

			return formStrings(out)

		}()


		)
}


