const path = require('path')
const wampPath = path.resolve(__dirname, '../')

const { listFiles } = require('connutils/src/fs')

const allowedMethodNames = [
    'call',
    'register',
    'publish',
    'subscribe',
]

const methodWrapper = require('../methodWrapper')

module.exports = function wamp_methods_wamp_buildMethods(wamp) {
    if (!wamp) throw new Error('Missing wamp connection object')

    const files = listFiles(wampPath).reduce((methods, name) => {
        if (!methods[name] && allowedMethodNames.includes(name)) {
            methods[name] = methodWrapper(name, wamp)
        }

        return methods
    }, {})

    return files
}
