const express = require('express')

const router = express.Router()

const accounts = ['Efectivo', 'Tarjeta de pago' ]

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

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/transaction', (req, res) => {
  const type = req.query.type
  const categories = type === 'inflow' ? inflowCategories : outflowCategories

  res.render('transaction', { type, accounts, categories })
})

router.post('/transaction', (req, res) => {
  console.log(req.body)
  console.log(req.query)

  req.flash('success', 'La transacción fue almacenada')
  return res.redirect('/')
})

module.exports = router
