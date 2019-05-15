const express = require('express')
const public = require('express')()
const bodyParser = require('body-parser')
const axios = require('axios')
// const config = require('./config.js')
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
// let parseForm = bodyParser.urlencoded({ extended: false })


public.get('/', controllers.getPoll)


module.exports = public