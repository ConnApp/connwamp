const test = require('ava')
const sinon = require('sinon')

const publish = require('./publish')

test('should publish route with correct arguments', async t => {
    const spy = sinon.spy()
    const wampMock = { publish: spy }

    const publishRoute = publish(wampMock)

    publishRoute('test', { test: true })

    t.notThrows(() => sinon.assert.calledWith(spy, 'test', { test: true }))
})
