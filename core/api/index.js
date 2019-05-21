const api = require('express')()
const bodyParser = require('body-parser')
const controllers = require('../controllers')


api.use(bodyParser.urlencoded({ extended: true}));
api.use(bodyParser.json());

api.get('/polls', (req, res, next) => {
    req.headers.authorization === 'fsad213asd5435' && req.body.secret === 'Fjasdoks1909asd'
            ? next()
            : res.send({error: '401'}
    )
     
}, controllers.getPolls)
api.get('/poll/:pollName', controllers.getPoll)

api.post('/poll/create', controllers.createPoll)
api.post('/poll/delete', controllers.deletePoll)
api.post('/poll/update/:pollName', controllers.updatePoll)

api.post('/poll/vote/:pollName', controllers.votePoll)
api.get('/poll/results/:poll', controllers.getResultsPoll)


module.exports = api