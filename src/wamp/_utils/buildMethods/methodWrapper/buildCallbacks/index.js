const getCallback = require('./getCallback')

module.exports = (resolve, reject) =>
    function wamp_utils_buildCallbacks(methodName, route) {
        return {
            onError: getCallback('error')(reject)(methodName, route),
            onSuccess: getCallback('success')(resolve)(methodName, route),
        }
    }
