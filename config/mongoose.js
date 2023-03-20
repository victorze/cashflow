const mongoose = require('mongoose')
const env = require('./env')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)
const connect = () => {
  mongoose
    .connect(env.MONGODB_URI)
    .then(() => logger.info('Connected successfully to mongodb server'))
    .catch((err) => {
      logger.info(`mongoose error → ${err.message}`)
      process.exit(1)
    })
}

module.exports = { connect }
