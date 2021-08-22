const transactionRepository = require('../repositories/transaction')

const accounts = ['Efectivo', 'Tarjeta de pago']

const inflowCategories = ['Ahorros', 'Depósitos', 'Salario']

const outflowCategories = [
  'Automovil',
  'Casa',
  'Comida',
  'Comunicaciones',
  'Deportes',
  'Entretenimiento',
  'Facturas',
  'Higiene',
  'Mascotas',
  'Regalos',
  'Restaurante',
  'Ropa',
  'Salud',
  'Taxi',
  'Transporte',
]

function index(req, res) {
  const type = req.query.type
  const categories = type === 'inflow' ? inflowCategories : outflowCategories

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
  store,
  validateTransaction
}
