const test = require('ava')

const buildMethods = require('./buildMethods')

const methods = [
    'call',
    'publish',
    'register',
    'subscribe',
]

test('should build methods object correctly', async t => {
    t.plan(8)

    const wampMock = {
        call() {
            t.pass()
        },
        publish() {
            t.pass()
        },
        register() {
            t.pass()
        },
        subscribe() {
            t.pass()
        },
    }

    const methodsObj = buildMethods(wampMock)

    for (let method in methodsObj) {
        t.true(methods.includes(method))
        methodsObj[method]('route', {}, {})
    }
})

test('should throw error if wamp connection instance is not provided', async t => {
    const error = t.throws(() => buildMethods())

    t.is(error.message, 'Missing wamp connection object')
})
