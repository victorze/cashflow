function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next)
}

const notFound = (req, res, next) => {
  const err = new Error('Aquí no hay nada interesante :(')
  err.status = 404
  next(err)
}

const handleErrors = (err, req, res, next) => {
  err.status = err.status || 500

  if (process.env.NODE_ENV === 'production') {
    return res.status(err.status).render(String(err.status))
  }

  next(err)
}

module.exports = {
  catchErrors,
  notFound,
  handleErrors,
}
