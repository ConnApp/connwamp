// Packages imports

const envName = process.env.NODE_ENV || 'development'

const isProduction = !isDevelopment
const isDevelopment = envName === 'development'

module.exports = {
    envName,
    isProduction,
    isDevelopment,
}
