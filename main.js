const env = require('./config/env')
const app = require('./app')
const logger = require('./utils/logger')
const mongoose = require('./config/mongoose')

mongoose.connect()

app.listen(env.PORT, () => {
  logger.info(`Starting development server: ${env.APP_URL}:${env.PORT}`)
})
