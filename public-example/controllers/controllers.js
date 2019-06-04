
const config = require('../config.js')
const axios = require('axios')
const crypto = require('crypto-js')

axios.defaults.headers.common['Authorization'] = 'c-8a9q;62j@+mVbsFb}^g\GV`=LQ(mY/-1'

function getPolls(req, res){
    axios.get(`${config.apiPath}/polls`)
    .then((result) => {
        res.render('index.ejs', {data: result.data})
    })
    .catch((err) => console.log(err))
}

function getPoll(req, res){
    axios.get(`${config.apiPath}/poll/${req.params.poll}`)
    .then((result) => {
        res.render('poll.ejs', {data: result.data})
    })
    .catch((err) => console.log(err))
}

function votePoll(req, res){
    axios.post(`${config.apiPath}/poll/vote/${req.params.poll}`,
                {option: req.body.option}
    )
    .then((result) => {
        axios.get(`${config.apiPath}/poll/${req.params.poll}`)
        .then((result) => {
            res.redirect(`/poll/${req.params.poll}`)
            
        })
        .catch((err) => console.log(err))

    })
    .catch((err) => console.log(err))
}

module.exports = {
    getPolls,
    getPoll,
    votePoll
}