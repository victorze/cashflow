const express = require('express')

const transactionRepository = require('../repositories/transaction')
const transactionController  = require('../controllers/transaction')
const { validateTransaction }  = require('../controllers/transaction')

const router = express.Router()

router.get('/', (req, res, next) => {
  const transactions = transactionRepository.getAll()
  res.render('index', { transactions })
})

router.get('/transaction', transactionController.index)
router.post('/transaction', validateTransaction, transactionController.store)

module.exports = router
