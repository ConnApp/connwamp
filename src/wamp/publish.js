const config = rrequire('config')

module.exports = (wamp = config.wamp) => async (route, payload = {}, callbackObject = {}, options = {}) => {
    // TODO Validate payload

    return wamp.publish(route, payload, callbackObject, options)
}
