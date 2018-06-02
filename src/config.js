// Packages imports

const envName = process.env.NODE_ENV || 'development'

const isDevelopment = envName === 'development'

const isProduction = !isDevelopment

module.exports = {
    envName,
    isProduction,
    isDevelopment,
}
