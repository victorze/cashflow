const Account = require('../models/account')
const Category = require('../models/category')
const Transaction = require('../models/transaction')

const index = async (req, res) => {
  const currentDate = new Date()
  const [currentYear, currentMonth] = [
    currentDate.getFullYear(),
    currentDate.getMonth(),
  ]
  const currentMonthTransactions = await Transaction.find({
    createdAt: {
      $gte: new Date(currentYear, currentMonth, 1),
      $lte: new Date(currentYear, currentMonth + 1, 1),
    },
    user: req.user._id,
  })

  res.render('transactions/index', { transactions: currentMonthTransactions })
}

const create = async (req, res) => {
  const [accounts, categories] = await Promise.all([
    Account.find({ user: req.user._id }),
    Category.find({ type: req.query.type, user: req.user._id }),
  ])

  res.render('transactions/create', {
    type: req.query.type,
    accounts,
    categories,
  })
}

const store = async (req, res) => {
  req.body.user = req.user._id
  await Transaction.create(req.body)

  req.flash('success', 'La transacción fue almacenada')
  res.redirect('/')
}

module.exports = { index, create, store }
