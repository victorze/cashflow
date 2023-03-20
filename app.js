const path = require('path')
const express = require('express')
const flash = require('connect-flash')
const middleware = require('./utils/middleware')
const expressSession = require('./config/expressSession')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))

app.use(expressSession.config)
app.use(flash())

app.use(middleware.requestLogger)
app.use(middleware.locals)

app.use('/', require('./routes'))

app.use(middleware.notFound)
app.use(middleware.handleErrors)

module.exports = app
