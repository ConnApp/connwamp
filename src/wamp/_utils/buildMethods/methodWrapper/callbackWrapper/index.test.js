const test = require('ava')

const callbackWrapper = require('.')

test('should wrap callback with pre and post hooks correctly', async t => {
    const procedure = 'procedure'
    const payload = { pay: 'load' }

    const hooks = {
        pre(test) {
            t.is(test.procedure, procedure)
            t.deepEqual(test.payload, payload)

            return { fromPre: true }
        },
        post(test, mainResult, preResult) {
            t.is(test.procedure, procedure)
            t.deepEqual(test.payload, payload)

            t.is(mainResult.result.args.procedure, procedure)
            t.deepEqual(mainResult.result.args.payload, payload)

            t.true(preResult.fromPre)
            t.true(mainResult.fromMain)
        },
    }

    const callback = async (args, preResult) => {
        return {
            fromMain: true,
            result: {
                args,
                preResult,
            },
        }
    }

    const wrappedCallback = callbackWrapper(callback, hooks)

    await wrappedCallback({
        argsDict: payload,
        details: { procedure },
    })
})

test('should wrap callback with only post hook correctly', async t => {
    const procedure = 'procedure'
    const payload = { pay: 'load' }

    const hooks = {
        post(test, mainResult) {
            t.is(test.procedure, procedure)
            t.deepEqual(test.payload, payload)

            t.is(mainResult.result.args.procedure, procedure)
            t.deepEqual(mainResult.result.args.payload, payload)

            t.true(mainResult.fromMain)
        },
    }

    const callback = async args => {
        return {
            fromMain: true,
            result: { args },
        }
    }

    const wrappedCallback = callbackWrapper(callback, hooks)

    await wrappedCallback({
        argsDict: payload,
        details: { procedure },
    })
})

test('should wrap callback with only pre-hook correctly', async t => {
    const procedure = 'procedure'
    const payload = { pay: 'load' }

    const hooks = {
        pre(test) {
            t.is(test.procedure, procedure)
            t.deepEqual(test.payload, payload)

            return { fromPre: true }
        },
    }

    const callback = async (args, preResult) => {
        return {
            fromMain: true,
            result: {
                args,
                preResult,
            },
        }
    }

    const wrappedCallback = callbackWrapper(callback, hooks)

    await wrappedCallback({
        argsDict: payload,
        details: { procedure },
    })
})
