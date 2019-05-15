
const config = require('../../config.js')
const axios = require('axios')

function getPoll(req, res){
    axios.get(`${config.apiPath}/poll/Favourite-letter`)
    .then((result) => {
        res.render('index.ejs', {data: result.data})
    })
    .catch((err) => console.log(err))
}

module.exports = {
    getPoll
}