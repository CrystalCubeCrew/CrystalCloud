let request = require('superagent') 
let newsConfig = require('../../config/newsConfig')
let formStrings = require('../singleFunction/formString')

class News{
	
	constructor ({Catalog}){
			this.Catalog =Catalog 
			this.begindate ='20170101'
			this.fl = 'headline,lead_paragraph'
	}

	performAction() {
		return new Promise(function (resolve,reject) {
			getNews(this)
			.then(function (data) {
				return setResponse(data)
			})
			.then(function (data) {
				resolve({response: data})
			})
			.catch(function (err) {
				reject(new Error(err))
			})
		})
	}
	
}
		
module.exports = News

let getNews = function(obj){
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
	return Promise.resolve(function(){
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


