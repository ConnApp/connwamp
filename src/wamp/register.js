const config = rrequire('config')

module.exports = (wamp = config.wamp) => async (
    route,
    payload = () => {},
    callbackObject = {},
    options = {}
) => {
    // TODO Validate payload

    callbackObject.rpc = payload

    return wamp.register(route, callbackObject, options)
}
