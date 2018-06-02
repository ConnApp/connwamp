const { getCallback } = require('./methods/callbacks')

module.exports = (resolve, reject) => (methodName, route) => ({
    onError: getCallback('error')(reject)(methodName, route),
    onSuccess: getCallback('success')(resolve)(methodName, route),
})
