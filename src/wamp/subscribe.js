const config = rrequire('config')

module.exports = (wamp = config.wamp) => async (
    route,
    payload = () => {},
    callbackObject = {},
    options = {}
) => {
    // TODO Validate payload

    callbackObject.onEvent = payload

    return wamp.subscribe(route, callbackObject, options)
}
