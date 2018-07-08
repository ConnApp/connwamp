const test = require('ava')
const sinon = require('sinon')

const register = require('.')

test('should register route with correct arguments', async t => {
    const spy = sinon.spy()
    const wampMock = { register: spy }

    const rpc = async () => {}
    const expectedPayload = { rpc }

    const registerRoute = register(wampMock)
    registerRoute('test', rpc)

    t.notThrows(() => sinon.assert.calledWith(spy, 'test', expectedPayload))
})
