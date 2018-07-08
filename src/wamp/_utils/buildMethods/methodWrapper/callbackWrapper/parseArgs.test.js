const test = require('ava')

const parseArgs = require('./parseArgs')

test('should parse arguments correctly [argsDict and ArgsList', async t => {
    const args = {
        argsDict: { pay: 'load' },
        details: { procedure: 'procedure' },
    }

    const parsedArgs = parseArgs([
        args,
    ])

    t.is(parsedArgs[0].procedure, args.details.procedure)
    t.is(parsedArgs[0].payload.pay, args.argsDict.pay)
})
