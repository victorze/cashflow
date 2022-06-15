const route = require('express').Router()
const { transactionController } = require('../controllers')
const { restrict, validateTransaction } = require('../handlers')

route.get('/', restrict, transactionController.index)
route.get('/create', restrict, transactionController.create)
route.post('/', [restrict, validateTransaction], transactionController.store)

module.exports = route
