require('dotenv').config()
const path = require('path')
const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const { notFound, handleErrors, getMonthName, amountFormat } = require('./handlers')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected successfully to mongodb server'))
  .catch((err) => {
    console.error(`mongoose error → ${err.message}`)
    process.exit(1)
  })

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}))
app.use(flash())
app.use((req, res, next) => {
  req.user = req.session.user
  res.locals.flashes = req.flash()
  res.locals.h = { getMonthName, amountFormat }
  res.locals.user = req.session.user
  next()
})

app.use('/', require('./routes'))

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
})
