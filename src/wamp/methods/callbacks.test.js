const test = require('ava')
const { getObjectType } = rrequire('utils/shared')

const { messages, getCallback } = require('./callbacks')

test('should get correctly success message', async t => {
    const successMessage = messages['success']('methodName', 'route')

    t.is(successMessage, 'METHODNAME - route assigned successfully')
})

test('should get correctly error message', async t => {
    const successMessage = messages['error']('methodName', 'route')

    t.is(successMessage, 'METHODNAME - route assignment failed!')
})

test('getCallback should take status and return a function', async t => {
    const getCallbackStatus = getCallback('success')

    t.is(getObjectType(getCallbackStatus), 'Function')
})

test('getCallback should take status and promise-element(reject or resolve) and return a function', async t => {
    const getCallbackStatusPromise = getCallback('success')(Promise.resolve)

    t.is(getObjectType(getCallbackStatusPromise), 'Function')
})

test('getCallback should take status, promise-element(reject or resolve) and methodName and route and return a function', async t => {
    const getCallbackStatusPromiseMethod = getCallback('success')(Promise.resolve)('methodName', 'route')

    t.is(getObjectType(getCallbackStatusPromiseMethod), 'Function')
})

test('getCallback should take status, promise-element(reject or resolve), methodName and route and a payload, and return a promise', async t => {
    const mock = onSuccess =>
        new Promise(resolve => {
            onSuccess(resolve)('methodName', 'route')({})
        })

    const onSuccess = getCallback('success')

    const expectedResult = {
        status: 'success',
        message: 'METHODNAME - route assigned successfully',
        payload: {},
    }

    const result = await mock(onSuccess)

    t.deepEqual(expectedResult, result)
})
test('getCallback should take status, promise-element(reject or resolve), methodName and route and a payload, and return a promise', async t => {
    const mock = onError =>
        new Promise((resolve, reject) => {
            onError(reject)('methodName', 'route')({})
        })

    const onError = getCallback('error')

    const error = await t.throws(mock(onError))

    const expectedError = {
        status: 'error',
        message: 'METHODNAME - route assignment failed!',
        payload: {},
    }

    t.deepEqual(error, expectedError)
})
