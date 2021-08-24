const transactionRepository = require('../repositories/transactionRepository')
const inflowCategoryRepository = require('../repositories/inflowCategoryRepository')
const outflowCategoryRepository =  require('../repositories/outflowCategoryRepository')
const accountRepository = require('../repositories/accountRepository')

function index(req, res) {

}

function create(req, res) {
  const type = req.query.type
  const accounts = accountRepository.getAll()
  const categories =
    type === 'inflow' ?
      inflowCategoryRepository.getAll() :
      outflowCategoryRepository.getAll()

  res.render('transaction', { type, accounts, categories })
}

function store(req, res) {
  transactionRepository.add(req.body)
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
