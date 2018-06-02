module.exports = wamp => async (route, payload = {}, callbackObject = {}, options = {}) => {
    // TODO Validate payload

    return wamp.call(route, payload, callbackObject, options)
}
