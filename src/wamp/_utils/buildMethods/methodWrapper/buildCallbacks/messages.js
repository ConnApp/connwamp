const messages = {
    error(methodName, route) {
        return `${methodName.toUpperCase()} - ${route} assignment failed!`
    },

    success(methodName, route) {
        return `${methodName.toUpperCase()} - ${route} assigned successfully`
    },
}

module.exports = messages
