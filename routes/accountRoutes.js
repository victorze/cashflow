const route = require('express').Router()
const { accountController } = require('../controllers')
const { restrict } = require('../handlers')

route.get('/', restrict, accountController.index)
route.post('/', restrict, accountController.store)
route.post('/:id/update', restrict, accountController.update)
route.get('/:id/destroy', restrict, accountController.destroy)

module.exports = route
