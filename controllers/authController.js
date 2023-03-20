const User = require('../models/user')
const Category = require('../models/category')
const Account = require('../models/account')
const { accounts, categories } = require('./initialData')

const register = (req, res) => {
  if (req.session.user) return res.redirect('/')
  res.render('auth/register')
}

const registerStore = async (req, res) => {
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

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
}

const login = (req, res) => {
  if (req.session.user) return res.redirect('/')
  res.render('auth/login')
}

const loginStore = (req, res) => {
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

const authenticate = async (email, password, fn) => {
  const user = await User.findOne({ email })

  if (!user) return fn(new Error('El correo electrónico no está registrado'))

  if (user.validPassword(password)) {
    fn(null, user)
  } else {
    fn(new Error('Credenciales incorrectas. Por favor, inténtalo de nuevo'))
  }
}

module.exports = { login, loginStore, logout, register, registerStore }
