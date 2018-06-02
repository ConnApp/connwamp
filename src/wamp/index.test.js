const test = require('ava')

test('should not throw error when building importing wamp module', async t => {
    t.notThrows(() => rrequire('wamp'))
})
