
const config = require('../config.js')
const axios = require('axios')
const crypto = require("crypto-js");

const ciphertext = crypto.AES.encrypt(config.apiKey, config.apiSecret).toString()

axios.defaults.headers.common['Authorization'] = ciphertext


function controllers(){
    function getPolls (req,res) {
        axios.get(`${config.apiPath}/polls`)
        .then((data) => {
            data.data.error === '401' 
                ? res.status(401).send('unauthorized') 
                : res.render('index.ejs', {data: data.data, path: config.adminPath + config.pollPath})
        })
        .catch(err => console.log(err))
    }
    function getPoll(req, res) {
        axios.get(`${config.apiPath}/poll/${req.params.poll}`)
        .then((data) => {
            res.render('poll.ejs', {data: data.data, csrf: req.csrfToken()})
        })
        .catch(err => console.log(err))
    }

    function updatePoll (req, res) {
        axios.post(`${config.apiPath}/poll/update/${req.params.poll}`, 
                     {newPollName: req.body.pollName, options: req.body.option}
        )
        .then((result) => {
            res.locals.message
        })
        .catch((err) => console.log(err))
    }

    function getCreatePoll(req, res){
        res.render('pollCreate.ejs', {csrf: req.csrfToken()})
    }

    function createPoll(req, res) {
        axios.post(`${config.apiPath}/poll/create`, 
                    {
                            pollName: req.body.pollName, 
                            options: req.body.option,
                            type: req.body.type,
                            active: req.body.active
                    }
        )
        .then((result) => {
            res.locals.message = result.data
            res.render('pollCreate.ejs', {data: {pollName: req.body.pollName, options: req.body.option}, csrf: req.csrfToken()})
        })
        .catch((err) =>console.log(err))
    }

    function deletePoll(req, res) {
        axios.post(`${config.apiPath}/poll/delete`, {pollName: req.body.pollName})
        .then((result) => {
            res.redirect(config.adminPath)
        })
        .catch(err => console.log(err))
    }


    return Object.freeze(Object.assign({}, {
        getPolls,
        getPoll,
        createPoll,
        getCreatePoll,
        updatePoll,
        deletePoll
    }))
}




module.exports = controllers()