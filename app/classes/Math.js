class Math{

  constructor ({number, operator}) {
    this._numbers = number
    this._operator = operator
  }

  performAction () {
    return createResponse(this)
  }
}

module.exports = Math

let createResponse = function (obj) {
  return Promise.resolve({
    response: `${obj._numbers[0]} ${obj._operator} ${obj._numbers[1]}`
  })
}