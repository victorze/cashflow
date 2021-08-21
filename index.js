require('dotenv').config()
const path = require('path')

const express = require('express')
const logger = require('morgan')
const routes = require('./routes')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'static')))

app.use('/', routes);

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
  console.log('Server on port', PORT)
})
