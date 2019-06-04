const express = require('express')
const public = express()
const bodyParser = require('body-parser')
const controllers = require('./controllers/controllers')
const cookieParser = require('cookie-parser');
const path = require('path')
const cs = require('csurf')


const csrf = cs({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

public.use(express.static(path.join(__dirname) + '/public/public'))
public.use(bodyParser.urlencoded({ extended: true}));
public.use(bodyParser.json());
public.use(cookieParser())
public.set('view engine', 'ejs')
public.set('views', __dirname + '/views')

public.get('/', controllers.getPolls)
public.get('/poll/:poll', controllers.getPoll)
public.post('/poll/vote/:poll', controllers.votePoll)



module.exports = public