require('dotenv').config()

module.exports.NODE_ENV = process.env.NODE_ENV

module.exports.APP_NAME = process.env.APP_NAME
module.exports.APP_URL = process.env.APP_URL
module.exports.PORT = process.env.PORT

module.exports.SECRET_KEY = process.env.SECRET_KEY
module.exports.MONGODB_URI = process.env.MONGODB_URI
