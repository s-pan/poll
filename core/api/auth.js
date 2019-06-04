const uuid = require('uuid/v4')
const crypto = require("crypto-js");
const config = require('./config.js')

module.exports = {
    auth: (req, res, next) => {
        var bytes  = crypto.AES.decrypt(req.headers.authorization, config.apiSecret);
        var apiKey = bytes.toString(crypto.enc.Utf8); 
        apiKey === config.apiKey
           ? next()
           : res.status(401).send('unauthorized')
    }
}