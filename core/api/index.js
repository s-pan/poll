const api = require('express')()
const bodyParser = require('body-parser')
const controllers = require('../controllers')
const auth = require('./auth.js')


api.use(bodyParser.urlencoded({ extended: true}));
api.use(bodyParser.json());
api.use(auth.auth)

api.get('/polls', controllers.getPolls)
api.get('/poll/:pollSlug', controllers.getPoll)

api.post('/poll/create', controllers.createPoll)
api.post('/poll/delete', controllers.deletePoll)
api.post('/poll/update/:pollName', controllers.updatePoll)

api.post('/poll/vote/:pollName', controllers.votePoll)
api.get('/poll/results/:poll', controllers.getResultsPoll)


module.exports = api