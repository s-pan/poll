const path = require('path')

module.exports = {
    a:     path.dirname(require.main.filename) + '/public/website/',
    staticTemplatesPath: path.dirname(require.main.filename) + '/templates/',
    adminPath:           '/admin',
    isModule:            false,
    apiPath:             'http://localhost:8083/api',
    apiKey: 'fsad213asd5435',
    apiSecret: 'Fjasdoks1909asd'


}