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
                maxRetries: 999,
                reconnectInterval: 1000,
                onConnect() {
                    console.log(`Connect to WAMP router at: ${url}`)
                },
                onClose() {
                    console.log(`Successfully disconnected from router: ${url}`)
                },
                onError(err) {
                    console.log(`Something when wrong while connections to router: ${url}`)
                    console.log('ERROR: ', err)
                },
                onReconnect() {
                    console.log(`Reconnecting to router: ${url} ...`)
                },
                onReconnectSuccess() {
                    console.log(`Successfully reconected to router: ${url}`)
                },
                ...options,
            })

            WAMP.session = wampSession

            const { call, register, publish, subscribe } = wampBuilder(WAMP.session)

            WAMP.call = call
            WAMP.register = register
            WAMP.publish = publish
            WAMP.subscribe = subscribe

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
