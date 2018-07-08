const path = require('path')
const { listFolders } = require('connutils').fs

const wampPath = path.resolve(__dirname, '../../')
const methodWrapper = require('./methodWrapper')

const allowedMethodNames = [
    'call',
    'register',
    'publish',
    'subscribe',
]

module.exports = function wamp_methods_wamp_buildMethods(wamp) {
    if (!wamp) throw new Error('Missing wamp connection object')

    const files = listFolders(wampPath).reduce((methods, name) => {
        if (!methods[name] && allowedMethodNames.includes(name)) {
            methods[name] = methodWrapper(name, wamp)
        }

        return methods
    }, {})

    return files
}
