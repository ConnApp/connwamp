const wampBuilder = require('./wamp')

const Wampy = require('wampy').Wampy
const w3cws = require('websocket').w3cwebsocket

const WAMP = {
    call: null,
    register: null,
    publish: null,
    subscribe: null,

    connected: false,

    session: null,

    connectedSince: null,
    lastConnected: null,
    async connect(url, options) {
        if (WAMP.connected) {
            console.log('WAMP is connected already')

            return false
        }

        try {
            const wampSession = new Wampy(url, {
                client: w3cws,
                ...options,
            })

            WAMP.session = wampSession

            const { call, register, publish, subscribe } = wampBuilder(WAMP.session)

            WAMP.call = call
            WAMP.register = register
            WAMP.publish = publish
            WAMP.subscribe = call

            WAMP.connected = true
            WAMP.connectedSince = new Date()
        } catch (error) {
            console.log('There was an error connecting to the WAMP router', error)
        }
    },
    async disconnect() {
        if (!WAMP.connected) {
            console.log('WAMP is not connected')

            return false
        }
        try {
            await WAMP.session.disconnect()

            WAMP.lastConnected = WAMP.connectedSince

            WAMP.call = null
            WAMP.publish = null
            WAMP.session = null
            WAMP.register = null
            WAMP.subscribe = null
            WAMP.connected = null
            WAMP.connectedSince = null
        } catch (error) {
            console.log('There was an error disconnecting from the WAMP router', error)
        }
    },
}

module.exports = WAMP
