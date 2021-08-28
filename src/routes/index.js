const express = require('express')
const { restrict } = require('../handlers')

const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const transactionController = require('../controllers/transactionController')
const { validateTransaction } = require('../controllers/transactionController')

const router = express.Router()

router.get('/', restrict, homeController.index)

router.get('/login', authController.login)
router.post('/login', authController.loginStore)

router.get('/transactions', restrict, transactionController.index)
router.get('/transactions/create', restrict, transactionController.create)
router.post(
  '/transactions',
  [restrict, validateTransaction],
  transactionController.store
)

module.exports = router
