const path = require('path')

const wampPath = path.resolve(__dirname, '../../')

module.exports = function wamp_methods_wamp_getMethod(methodName) {
    let method

    try {
        if (!methodName) throw Error('No method type')

        method = require(`${wampPath}/${methodName}`)
    } catch (error) {
        throw error
    }

    return method
}
