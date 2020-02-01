const path = require('path')
const PluginError = require('plugin-error')
const through = require('through2')
const htmlBemValidator = require('./src/index')

const PLUGIN_NAME = 'gulp-html-bem-validator'

module.exports = function () {
    return through.obj(function (file, encoding, callback) {
        if (file.isNull()) return callback(null, file)

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'))
            return callback(null)
        }

        htmlBemValidator.htmlBemValidatorResult({
            name: path.basename(file.path),
            content: String(file.contents)
        })

        callback(null, file)
    })
}
