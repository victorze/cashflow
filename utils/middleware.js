const { amountFormat, getMonthName } = require('./format')
const logger = require('./logger')

const locals = (req, res, next) => {
  req.user = req.session.user
  res.locals.flashes = req.flash()
  res.locals.h = { getMonthName, amountFormat }
  res.locals.user = req.session.user
  logger.debug('Flash', res.locals.flashes)
  logger.debug(req.session)
  next()
}

const requestLogger = (req, _res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const notFound = (_req, _res, next) => {
  const err = new Error('Aquí no hay nada interesante :(')
  err.status = 404
  next(err)
}

const handleErrors = (err, _req, res, next) => {
  err.status = err.status || 500

  if (process.env.NODE_ENV === 'production') {
    return res.status(err.status).render(String(err.status))
  }

  next(err)
}

const auth = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = {
  locals,
  requestLogger,
  notFound,
  handleErrors,
  auth,
}
