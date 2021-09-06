const User = require('../models/user')

async function register(req, res) {
  if (req.session.user) {
    res.redirect('/')
  }

  res.render('auth/register')
}

async function registerStore(req, res) {
  if (await User.findOne({ email: req.body.email })) {
    req.flash('error', `El correo ${req.body.email} ya está en uso. Elige otro`)
    return res.redirect('back')
  }

  const user = new User({ name: req.body.name, email: req.body.email })
  user.setPassword(req.body.password)
  await user.save()

  req.flash('success', 'Usuario registrado')

  req.session.regenerate(() => {
    req.session.user = user
    res.redirect('/')
  })
}

function validateRegister(req, res, next) {
  const errors = []

  if (!req.body.name || !req.body.email || !req.body.password) {
    errors.push('Los campos nombre, email y contraseña son obligatorios')
  }

  if (req.body.password && req.body.password.length <= 8) {
    errors.push('La contraseña debe contener 8 caracteres como mínimo')
  }

  if (req.body.password && req.body.confirmPassword !== req.body.password) {
    errors.push('Las contraseñas no coinciden')
  }

  if (errors.length) {
    req.flash('error', errors)
    res.redirect('back')
  } else {
    next()
  }
}

async function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login')
  })
}

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
  logout,
  register,
  registerStore,
  validateRegister,
}
