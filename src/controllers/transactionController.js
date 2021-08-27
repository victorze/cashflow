const Account = require('../models/account')
const Category = require('../models/category')
const Transaction = require('../models/transaction')

async function index(req, res) {
  const currentDate = new Date()
  const [currentYear, currentMonth] = [
    currentDate.getFullYear(),
    currentDate.getMonth(),
  ]
  const currentMonthTransactions = await Transaction.find({
    date: {
      $gte: new Date(currentYear, currentMonth, 1),
      $lte: new Date(currentYear, currentMonth + 1, 1),
    },
  })

  console.log({ currentMonthTransactions })
  res.render('transactions/index', { transactions: currentMonthTransactions })
}

async function create(req, res) {
  const [accounts, categories] = await Promise.all([
    Account.find(),
    Category.find({ type: req.query.type }),
  ])

  console.log({ accounts, categories })
  res.render('transactions/create', { accounts, categories })
}

async function store(req, res) {
  await Transaction.create(req.body)

  req.flash('success', 'La transacción fue almacenada')
  res.redirect('/')
}

function validateTransaction(req, res, next) {
  const errors = []

  if (!req.body.account) {
    errors.push('Debe seleccionar una cuenta')
  }

  if (!req.body.category) {
    errors.push('Debe seleccionar una categoría')
  }

  if (isNaN(req.body.amount) || !req.body.amount) {
    errors.push('Ingrese un monto válido')
  }

  if (errors.length) {
    req.flash('error', errors)
    res.redirect('back')
  } else {
    next()
  }
}

module.exports = {
  index,
  create,
  store,
  validateTransaction,
}
