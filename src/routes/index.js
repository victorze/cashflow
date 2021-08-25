const express = require('express')

const homeController = require('../controllers/homeController')
const transactionController = require('../controllers/transactionController')
const { validateTransaction } = require('../controllers/transactionController')

const router = express.Router()

router.get('/', homeController.index)

router.get('/transactions', transactionController.index)
router.get('/transactions/create', transactionController.create)
router.post('/transactions', validateTransaction, transactionController.store)

module.exports = router
