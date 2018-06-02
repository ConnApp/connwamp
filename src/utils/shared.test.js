const test = require('ava')

const { isFunction, buildRoute, readFileInDir, getObjectType } = rrequire('utils/shared')

test('getObjectType tests', async t => {
    const elements = [
        () => {},
        async () => {},
        function() {},
        async function() {},
        {},
        [],
        null,
        'string',
        0,
        10,
        true,
        false,
        new Error(),
        new Promise(() => {}),
    ]

    const expectedResult = [
        'Function',
        'AsyncFunction',
        'Function',
        'AsyncFunction',
        'Object',
        'Array',
        'Null',
        'String',
        'Number',
        'Number',
        'Boolean',
        'Boolean',
        'Error',
        'Promise',
    ]

    const result = elements.map(getObjectType)

    t.deepEqual(result, expectedResult)
})

test('should build route correctly', async t => {
    const expectedResult = '1.2.3.myroute.5'

    const route = buildRoute(1, 2, 3, 'myroute', 5)

    t.is(route, expectedResult)
})

test('should test if is function correctly', async t => {
    const tests = [
        () => {},
        async () => {},
        function() {},
        async function() {},
        {},
        [],
        null,
        'string',
        0,
        10,
        true,
        false,
    ]

    const expectedResult = [
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]

    const result = tests.map(isFunction)

    t.deepEqual(expectedResult, result)
})

test('should read files in a directory correctly and not read test files', async t => {
    const expectedResult = [
        'require',
        'shared',
    ]

    const dirFiles = readFileInDir(__dirname)

    t.deepEqual(expectedResult, dirFiles)
})
