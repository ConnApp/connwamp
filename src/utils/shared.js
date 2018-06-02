const fs = require('fs')
const path = require('path')
const logger = require('loglevel')
const toSlugCase = require('to-slug-case')

function buildRoute() {
    return [
        ...arguments,
    ].join('.')
}

// NOTE NOT USED
const requireModules = moduleName => {
    const modelsDirPath = path.join(src_path, moduleName)

    const modules = fs
        .readdirSync(modelsDirPath)
        .filter(moduleName => !moduleName.includes('test.js') && !moduleName.includes('index.js'))

    return modules.map(module => ({
        name: module.split('.js').join(''),
        routes: rrequire(`${moduleName}/${module}`),
    }))
}

// NOTE NOT USED
const initModule = async (moduleName, customInitProcedure) => {
    const result = []
    const modules = requireModules(moduleName)

    for (let module of modules) {
        const { name, routes } = module
        const uppercaseModuleName = moduleName.toUpperCase()

        const initStatus = {
            status: 'success',
            module: moduleName,
            message: `${uppercaseModuleName}: ${name} started successfully`,
        }

        try {
            for (let route in routes) {
                const procedure = routes[route]
                const normalizedRouteName = toSlugCase(route)
                const fullRoute = buildRoute('connapp', name, normalizedRouteName)

                await customInitProcedure(fullRoute, procedure)
            }
        } catch (error) {
            const message = `${uppercaseModuleName}.${name}: ${error.message}`

            logger.error(message)

            initStatus.status = 'error'
            initStatus.message = message
        }

        result.push(initStatus)
    }

    return result
}

// TODO test
const readFileInDir = dirPath => {
    const files = fs
        .readdirSync(dirPath)
        .filter(file => {
            const isIndex = file.includes('index')
            const isTest = file.includes('.test.js')
            const isDirectory = fs.lstatSync(path.resolve(dirPath, file)).isDirectory()

            return !isIndex && !isDirectory && !isTest
        })
        .map(file => file.replace('.js', ''))

    return files
}

// TODO test
const isFunction = element => typeof element === 'function'

const getObjectType = fn => {
    const fnString = Object.prototype.toString.call(fn)

    const rawType = fnString.replace(/(\[|\])/g, '')

    return rawType.split(' ').pop()
}

module.exports = {
    isFunction,
    buildRoute,
    readFileInDir,
    getObjectType,
}
