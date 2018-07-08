module.exports = function wamp_methods_wamp_parseArgs(args) {
    return [
        {
            payload: args[0].argsDict,
            procedure: args[0].details.procedure,
        },
    ]
}
