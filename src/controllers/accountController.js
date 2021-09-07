const Account = require('../models/account')
const Transaction = require('../models/transaction')

async function index(req, res) {
  const accounts = await Account.find({ user: req.user._id })
  res.render('accounts/index', { accounts })
}

async function store(req, res) {
  req.body.user = req.user._id
  await Account.create(req.body)
  req.flash('success', 'La cuenta fue creada correctamente')
  res.redirect('/accounts')
}

async function update(req, res) {
  await Account.findByIdAndUpdate(req.params.id, req.body)
  req.flash('success', 'La cuenta fue actualizada correctamente')
  res.redirect('/accounts')
}

async function destroy(req, res) {
  await Account.findByIdAndDelete(req.params.id)
  req.flash('success', 'La cuenta fue eliminada')
  res.redirect('/accounts')
}

module.exports = {
  index,
  store,
  update,
  destroy,
}
