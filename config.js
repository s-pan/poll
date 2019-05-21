const path = require('path')

module.exports = {
    a:     path.dirname(require.main.filename) + '/public/website/',
    staticTemplatesPath: path.dirname(require.main.filename) + '/templates/',
    adminPath:           '/admin',
    isModule:            false,
}