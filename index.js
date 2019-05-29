const app = require('express')()
const api = require('./core/api')
const admin = require('./admin-example')
const example = require('./public-example')
var debug = require('debug')('http')

// debug('app', app)

app.use('/api', api)
app.use('/admin', admin)
app.use('/', example)

app.listen(8083)