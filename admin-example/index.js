const express = require('express')
const admin = require('express')()
const bodyParser = require('body-parser')
const axios = require('axios')
const config = require('./config.js')
const controllers = require('./controllers/controllers')
const cookieParser = require('cookie-parser');
const path = require('path')
const cs = require('csurf')


const csrf = cs({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

admin.use(express.static(path.join(__dirname) + '/public/public'))
admin.use(bodyParser.urlencoded({ extended: true}));
admin.use(bodyParser.json());
admin.use(cookieParser())
admin.set('view engine', 'ejs')
admin.set('views', __dirname + '/views')
// let parseForm = bodyParser.urlencoded({ extended: false })


admin.get('/', controllers.getPolls)
admin.get('/poll/create', csrf, controllers.getCreatePoll)
admin.get('/poll/:poll', csrf, controllers.getPoll)

admin.post('/poll/update/:poll', parseForm, csrf, controllers.updatePoll)
admin.post('/poll/create', parseForm, csrf, controllers.createPoll)
admin.post('/poll/delete', parseForm, csrf, controllers.deletePoll)

module.exports = admin