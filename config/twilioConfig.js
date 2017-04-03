let accountSid = 'ACd11f0f966d82618b663cfa932204a1c5'
let authToken = 'bfae24de12b2764d0c3b5d11e4cef23a'

var client = require('twilio')(accountSid, authToken)

module.exports = client;