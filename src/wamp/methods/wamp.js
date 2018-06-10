const path = require('path')

const src_path = path.resolve(__dirname, '../../')

const wampPath = path.join(src_path, 'wamp')

const buildCallbacks = require('../callbacks')
const { isFunction } = require('../../utils/shared')
const { readFileInDir } = require('../../utils/shared')

const allowedMethodNames = [
    'call',
    'publish',
    'register',
    'subscribe',
]

const parseArgs = args => {
    return {
        payload: args.argsDict,
        procedure: args.details.procedure,
    }
}

const getMethod = methodName => {
    let method
    // TODO Validate Method Name
    try {
        if (!methodName) throw Error('No method type')

        method = require(`${wampPath}/${methodName}`)
    } catch (error) {
        throw error
    }

    return method
}

const callbackWrapper = (callback, { pre, post } = {}) => {
    return async function() {
        const functionArguments = parseArgs(arguments)

        let preResult = {}

        if (isFunction(pre)) {
            preResult = await pre.apply(null, [
                ...functionArguments,
            ])
        }

        const mainResult = await callback.apply(null, [
            ...functionArguments,
            preResult,
        ])

        if (isFunction(post)) {
            await post.apply(null, [
                ...functionArguments,
                preResult,
                mainResult,
            ])
        }

        return mainResult
    }
}

const methodWrapper = methodName => wamp => (route, payload, { pre, post, ...options } = {}) =>
    new Promise((resolve, reject) => {
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

const buildMethods = wamp => {
    if (!wamp) throw new Error('Missing wamp connection object')

    return readFileInDir(wampPath).reduce((methods, name) => {
        if (!methods[name] && allowedMethodNames.includes(name)) {
            methods[name] = methodWrapper(name)(wamp)
        }

        return methods
    }, {})
}

module.exports = {
    getMethod,
    buildMethods,
    methodWrapper,
    callbackWrapper,
}
