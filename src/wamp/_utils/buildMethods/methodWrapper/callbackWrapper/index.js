const parseArgs = require('./parseArgs')
const { isFunction } = require('connutils/src/assert')

module.exports = (callback, { pre, post } = {}) =>
    async function wamp_methods_wamp_callbackWrapper() {
        const functionArguments = parseArgs([
            ...arguments,
        ])

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
                mainResult,
                preResult,
            ])
        }

        return mainResult
    }
