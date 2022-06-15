require('dotenv').config()
const path = require('path')

const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')

const routes = require('./routes')
const helpers = require('./helpers')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('error', (err) => {
  console.error(`→ ${err.message}`)
  process.exit(1)
})

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(flash())

app.use((req, res, next) => {
  req.user = req.session.user
  res.locals.flashes = req.flash()
  res.locals.h = helpers
  res.locals.user = req.session.user
  console.log({ locals: res.locals, session: req.session })
  next()
})

app.use('/', routes)

app.use((req, res, next) => {
  const err = new Error('404 Not Found.')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  err.status = err.status || 500

  if (app.get('env') === 'production') {
    return res.status(err.status).render(String(err.status))
  }

  next(err)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Starting development server at http://localhost:${PORT}`)
})
