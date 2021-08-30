function restrict(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next)
}

module.exports = {
  restrict,
  catchErrors,
}
