let musicList = require('../../config/musicList.js')

class Music {
  constructor({songname}){
    this._songName = songname
  } 

  performAction(){
    return getSong(this)
  }
}

module.exports = Music

let getSong = function (obj) {
  let song = musicList[obj._songName]
  if(song.length === 0){
    return Promise.reject('No song exist')
  }
  else{
    return Promise.resolve({response: song})
  }
}

