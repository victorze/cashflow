const User = require('../models/user')
const Category = require('../models/category')
const Account = require('../models/account')
const { accounts, categories } = require('./initialData')
const { catchErrors } = require('../handlers')

async function register(req, res) {
  if (req.session.user) {
    res.redirect('/')
  }

  res.render('auth/register')
}

async function registerStore(req, res) {
  if (await User.findOne({ email: req.body.email })) {
    req.flash('error', `El correo ${req.body.email} ya está en uso`)
    return res.redirect('back')
  }

  const user = new User({ name: req.body.name, email: req.body.email })
  user.setPassword(req.body.password)
  await user.save()

  await Promise.all([
    Account.create(accounts.map((account) => ({ ...account, user: user._id }))),
    Category.create(
      categories.map((category) => ({ ...category, user: user._id }))
    ),
  ])

  req.session.regenerate(() => {
    req.session.user = user
    res.redirect('/')
  })
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
  login: catchErrors(login),
  loginStore: catchErrors(loginStore),
  logout: catchErrors(logout),
  register: catchErrors(register),
  registerStore: catchErrors(registerStore),
}
