const uuid = require('uuid/v4')



module.exports = {
    auth: (req, res, next) => {
        req.headers.authorization === 'fsad213asd5435' && req.body.secret === 'Fjasdoks1909asd'
        ? next()
        : res.status(401).send('unauthorized')
    }
}