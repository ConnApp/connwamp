const messages = {
    error(methodName, route) {
        return `${methodName.toUpperCase()} - ${route} assignment failed!`
    },

    success(methodName, route) {
        return `${methodName.toUpperCase()} - ${route} assigned successfully`
    },
}

const getCallback = status => promise => (methodName, route) => {
    // NOTE Actual function triggered by Wampy events
    return payload => {
        const message = messages[status](methodName, route)

        const info = {
            status,
            message,
            payload,
        }

        return promise(info)
    }
}

module.exports = {
    messages,
    getCallback,
}
