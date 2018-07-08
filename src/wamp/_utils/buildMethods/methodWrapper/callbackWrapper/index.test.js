const test = require('ava')

const callbackWrapper = require('./callbackWrapper')

test.todo('callbackWrapper')

test('should wrap callback with pre and post hooks correctly', async t => {
    const hooks = {
        pre(test, test2) {
            t.is(test, 1)
            t.is(test2, 2)

            return { fromPre: true }
        },
        post(test, test2, preResult, mainResult) {
            t.is(test, 1)
            t.is(test2, 2)
            t.is(mainResult.result, 3)

            t.true(preResult.fromPre)
            t.true(mainResult.fromMain)
        },
    }

    const callback = async (test, test2, preResult) => {
        t.true(preResult.fromPre)

        return {
            fromMain: true,
            result: test + test2,
        }
    }

    const wrappedCallback = callbackWrapper(callback, hooks)

    wrappedCallback(1, 2)
})

test.only('should wrap callback with only post hook correctly', async t => {
    const hooks = {
        post(test, test2, preResult, mainResult) {
            t.is(test, 1)
            t.is(test2, 2)
            t.is(mainResult.result, 3)

            t.deepEqual(preResult, {})
            t.true(mainResult.fromMain)
        },
    }

    const callback = async (test, test2, preResult) => {
        t.deepEqual(preResult, {})

        return {
            fromMain: true,
            result: test + test2,
        }
    }

    const wrappedCallback = callbackWrapper(callback, hooks)

    wrappedCallback({
        argsDict: 1,
        details: { procedure: 2 },
    })
})

test('should wrap callback with only pre-hook correctly', async t => {
    const hooks = {
        pre(test, test2) {
            t.is(test, 1)
            t.is(test2, 2)

            return { fromPre: true }
        },
    }

    const callback = async (test, test2, preResult) => {
        t.true(preResult.fromPre)

        return {
            fromMain: true,
            result: test + test2,
        }
    }

    const wrappedCallback = callbackWrapper(callback, hooks)

    wrappedCallback(1, 2)
})
