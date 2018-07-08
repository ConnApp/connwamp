const test = require('ava')
const buildCallbacks = require('.')

test('should resolve promise when executing success callback', async t => {
    const route = 'route'
    const methodName = 'method'

    const result = await new Promise((resolve, reject) => {
        return buildCallbacks(resolve, reject)(methodName, route).onSuccess(true)
    })

    const expectedResult = {
        status: 'success',
        message: 'METHOD - route assigned successfully',
        payload: true,
    }

    t.deepEqual(expectedResult, result)
})

test('should reject promise when executing error callback', async t => {
    const route = 'route'
    const methodName = 'method'

    const result = await t.throws(
        new Promise((resolve, reject) => {
            return buildCallbacks(resolve, reject)(methodName, route).onError(true)
        })
    )

    const expectedResult = {
        payload: true,
        status: 'error',
        message: 'METHOD - route assignment failed!',
    }

    t.deepEqual(expectedResult, result)
})
