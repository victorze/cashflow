const session = require('express-session')
const MongoStore = require('connect-mongo')
const env = require('./env')

const config = session({
  secret: env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: env.MONGODB_URI }),
})

module.exports = { config }
