const express = require("express")

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

router.get("/", (req, res, next) => {
  console.log(req.flash('info'))
  res.render("index", { title: "Express" })
})

router.get('/transaction', (req, res) => {
  const categories = req.query.type === 'inflow' ? inflowCategories : outflowCategories;

  res.render('transaction', { type: req.query.type, accounts, categories });
})

router.post('/transaction', (req, res) => {
  console.log(req.body)
  console.log(req.query)

  req.flash('info', 'La información fue almacenada.')
  return res.redirect('/')
})

module.exports = router;
