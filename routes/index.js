const express = require('express')

const homeController = require('../controllers/homeController')
const transactionController  = require('../controllers/transactionController')
const { validateTransaction, outflowCategories }  = require('../controllers/transactionController')

const router = express.Router()

router.get('/', homeController.index)
router.get('/transaction', transactionController.index)
router.post('/transaction', validateTransaction, transactionController.store)

module.exports = router
