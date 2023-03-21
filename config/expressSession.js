const session = require('express-session')
const MongoStore = require('connect-mongo')
const env = require('./env')

module.exports = session({
  secret: env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: env.MONGODB_URI }),
})
