const messages = require('./messages')

module.exports = status => promise =>
    function wamp_utils_buildCallbacks_getCallbacks(methodName, route) {
        // NOTE Actual function triggered by Wampy events
        return payload => {
            const message = messages[status](methodName, route)

            const info = {
                status,
                message,
                payload,
            }

            return promise(info)
        }
    }
