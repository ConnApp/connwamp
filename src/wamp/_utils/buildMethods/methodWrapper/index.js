const getMethod = require('./getMethod')
const buildCallbacks = require('./buildCallbacks')
const callbackWrapper = require('./callbackWrapper')
const { isFunction } = require('connutils/src/assert')

module.exports = (methodName, wamp) =>
    function wamp_methods_wamp_methodWrapper(route, payload, { pre, post, ...options } = {}) {
        return new Promise(function wamp_methods_wamp_methodWrapper_promise(resolve, reject) {
            {
                // TODO Validate methodName and Routes
                try {
                    const method = getMethod(methodName) // NOTE Might throw error
                    const callbacks = buildCallbacks(resolve, reject)(methodName, route)

                    if (isFunction(payload)) {
                        const callbackOptions = {
                            pre,
                            post,
                        }

                        payload = callbackWrapper(payload, callbackOptions)
                    }

                    return method(wamp)(route, payload, callbacks, options) // NOTE Might throw error
                } catch (error) {
                    reject(error)
                }
            }
        })
    }
