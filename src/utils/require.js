const path = require('path')

// For testing only
global.arequire = {}

global.src_path = path.join(__dirname, '../')

global.rrequire = function(module) {
    const modulePath = path.join(global.src_path, module)

    return require(modulePath)
}
