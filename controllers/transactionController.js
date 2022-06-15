const Account = require('../models/account')
const Category = require('../models/category')
const Transaction = require('../models/transaction')
const { catchErrors } = require('../handlers')

async function index(req, res) {
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

async function create(req, res) {
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

async function store(req, res) {
  req.body.user = req.user._id
  await Transaction.create(req.body)

  req.flash('success', 'La transacción fue almacenada')
  res.redirect('/')
}

module.exports = {
  index: catchErrors(index),
  create: catchErrors(create),
  store: catchErrors(store),
}
