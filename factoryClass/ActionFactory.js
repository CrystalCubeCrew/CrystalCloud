let Music = require('../app/classes/Music')
let News = require('../app/classes/News')
let Weather = require('../app/classes/Weather')
let CreateUser = require('../app/classes/CreateUser')
let GetUser = require('../app/classes/GetUser')

class Action {
  constructor (intent, data) {
    if(intent === 'news intent')
      return new News(data)

    else if(intent === 'weather intent')
      return new Weather(data)

    else if(intent === 'Create User')
      return new CreateUser(data)

    else if(intent === 'Get User')
      return new GetUser(data)

    else if(intent === 'Music')
      return new Music(data)   
  }
}

module.exports = Action






