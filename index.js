const app = require('express')()
const api = require('./core/api')
const admin = require('./admin')
const example = require('./public-example')

app.use('/api', api)
app.use('/admin', admin)
app.use('/', example)

app.listen(8083)