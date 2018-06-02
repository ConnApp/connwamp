const config = rrequire('config')

module.exports = (wamp = config.wamp) => async (route, payload = {}, callbackObject = {}, options = {}) => {
    // TODO Validate payload

    return wamp.call(route, payload, callbackObject, options)
}
