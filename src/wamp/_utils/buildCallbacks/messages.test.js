const test = require('ava')

const messages = require('./messages')

test('should get correctly success message', async t => {
    const successMessage = messages['success']('methodName', 'route')

    t.is(successMessage, 'METHODNAME - route assigned successfully')
})

test('should get correctly error message', async t => {
    const successMessage = messages['error']('methodName', 'route')

    t.is(successMessage, 'METHODNAME - route assignment failed!')
})
