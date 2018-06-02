const test = require('ava')
const sinon = require('sinon')

const call = require('./call')

test('should call route with correct arguments', async t => {
    const spy = sinon.spy()
    const wampMock = { call: spy }

    const callRoute = call(wampMock)

    callRoute('test', { test: true })

    t.notThrows(() => sinon.assert.calledWith(spy, 'test', { test: true }))
})
