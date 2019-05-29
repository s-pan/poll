
const config = require('../../core/api/config.js')
const axios = require('axios')

axios.defaults.headers.common['Authorization'] = 'fsad213asd5435';

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