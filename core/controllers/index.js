const db = require('../db')
const bodyParser = require('body-parser')
const slug = require('slug')


db.init()


function controllers(){
    function getPolls(req, res) {
        db.getPolls()
        .then((result) => {
            res.send(result)
        })
        .catch(err => console.log(err))
    }

    function getPoll(req, res) {
        db.getPoll({pollName: req.params.pollName})
        .then((result) => {
            res.send(result)}
        )
        .catch(err => console.log(err))
    }

    function createPoll(req, res) {
        db.createPoll({pollName: req.body.pollName, 
                        options: Array.isArray(req.body.options) ? req.body.options : [req.body.options],
                        type: req.body.type,
                        active: req.body.active,
                        slug: slug(req.body.pollName).toLowerCase()
        })
        .then((result) => {
            res.send({type: 'success', message: result})}
        )
        .catch(err => {
            res.send({type: 'error', message: err})
        })
    }

    function deletePoll(req, res) {
        db.deletePoll({pollName: req.body.pollName})
        .then((result => {
            res.send(result)
        }))
        .catch(err => console.log(err))
    }

    function updatePoll (req, res) {
        db.updatePoll({pollSlug: req.params.pollName, 
                       newPollName: req.body.newPollName,
                       options: req.body.options
        })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
    }

    function votePoll(req, res){
        db.votePoll({pollName: req.params.pollName, vote: Array.isArray(req.body.option) ? req.body.option : [req.body.option] })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => res.send(err))

    }

    function getResultsPoll(req, res){
        db.getResults({poll: req.params.poll})
        .then((result) => {
            res.send(result)
        })
        .catch(err => console.log(err))
    }

    return Object.freeze(Object.assign({}, {
        getPoll,
        createPoll,
        deletePoll,
        updatePoll,
        getPolls,
        votePoll,
        getResultsPoll
    }))
}




module.exports = controllers()