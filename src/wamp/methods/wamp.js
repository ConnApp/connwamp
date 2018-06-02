const path = require('path')

const { isFunction } = rrequire('utils/shared')
const buildCallbacks = rrequire('wamp/callbacks')
const { readFileInDir } = rrequire('utils/shared')

const allowedMethodNames = [
    'call',
    'publish',
    'register',
    'subscribe',
]

const getMethod = methodName => {
    let method
    // TODO Validate Method Name
    try {
        if (!methodName) throw Error('No method type')

        method = rrequire(`wamp/${methodName}`)
    } catch (error) {
        throw error
    }

    return method
}

const callbackWrapper = (callback, { pre, post } = {}) => {
    return async function() {
        const functionArguments = arguments

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

const methodWrapper = methodName => wamp => (route, payload, { pre, post, ...options }) =>
    new Promise((resolve, reject) => {
        {
            // TODO Validate methodName and Routes
            try {
                const method = getMethod(methodName) // NOTE Might throw error
                const callbacks = buildCallbacks(resolve, reject)(methodName, route)

                if (isFunction(payload)) {
                    payload = callbackWrapper(payload, {
                        pre,
                        post,
                    })
                }

                return method(wamp)(route, payload, callbacks, options) // NOTE Might throw error
            } catch (error) {
                reject(error)
            }
        }
    })

const buildMethods = wamp => {
    if (!wamp) throw new Error('Missing wamp connection object')

    const wampPath = path.join(src_path, 'wamp')

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
