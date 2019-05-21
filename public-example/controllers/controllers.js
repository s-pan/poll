
const config = require('../../core/api/config.js')
const axios = require('axios')

function getPoll(req, res){
    axios.get(`${config.apiPath}/poll/Favourite-letter`, {
        headers: {
            'Authorization': 'fsad213asd5435',
        },
        data : {
            'secret': 'Fjasdoks1909asd'
        }
    })
    .then((result) => {
        res.render('index.ejs', {data: result.data})
    })
    .catch((err) => console.log(err))
}

module.exports = {
    getPoll
}