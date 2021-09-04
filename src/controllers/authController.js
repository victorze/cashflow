const User = require('../models/user')

async function login(req, res) {
  if (req.session.user) {
    res.redirect('/')
  }

  res.render('auth/login')
}

async function loginStore(req, res) {
  authenticate(req.body.email, req.body.password, (err, user) => {
    if (user) {
      req.session.regenerate(() => {
        req.session.user = user
        res.redirect('/')
      })
    } else {
      req.flash('error', err.message)
      res.redirect('/login')
    }
  })
}

async function authenticate(email, password, fn) {
  const user = await User.findOne({ email })

  if (!user) return fn(new Error('El correo electrónico no está registrado'))

  if (user.validPassword(password)) {
    fn(null, user)
  } else {
    fn(new Error('Credenciales incorrectas. Por favor, inténtalo de nuevo'))
  }
}

module.exports = {
  login,
  loginStore,
}
