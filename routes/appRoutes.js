const route = require('express').Router()
const homeController = require('../controllers/homeController')
const accountController = require('../controllers/accountController')
const categoryController = require('../controllers/categoryController')
const transactionController = require('../controllers/transactionController')
const { auth } = require('../utils/middleware')
const { validateTransaction } = require('../utils/validator')

route.get('/', auth, homeController.index)

route.get('/accounts', auth, accountController.index)
route.post('/accounts', auth, accountController.store)
route.post('/accounts/:id/update', auth, accountController.update)
route.get('/accounts/:id/destroy', auth, accountController.destroy)

route.get('/categories', auth, categoryController.index)
route.post('/categories', auth, categoryController.store)
route.post('/categories/:id/update', auth, categoryController.update)
route.get('/categories/:id/destroy', auth, categoryController.destroy)

route.get('/transactions', auth, transactionController.index)
route.get('/transactions/create', auth, transactionController.create)
route.post(
  '/transactions',
  [auth, validateTransaction],
  transactionController.store
)

module.exports = route
