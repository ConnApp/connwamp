const test = require('ava')
const path = require('path')
const getMethod = require('./getMethod')
const { getType } = require('connutils/src/assert')

const src_path = path.resolve(__dirname, '../../../')

const methods = [
    'call',
    'publish',
    'register',
    'subscribe',
]

test('should get methods correctly', async t => {
    for (let method of methods) {
        const mthd = getMethod(method)

        t.is(getType(mthd), 'Function')
    }
})

test('should throw error when require unexisting method', async t => {
    const error = await t.throws(() => getMethod('null'))

    t.is(error.message, `Cannot find module '${src_path}/wamp/null'`)
})

test('should throw error no method name is provided', async t => {
    const error = await t.throws(() => getMethod())

    t.is(error.message, 'No method type')
})
