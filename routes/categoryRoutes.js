const route = require('express').Router()
const { categoryController } = require('../controllers')
const { restrict } = require('../handlers')

route.get('/', restrict, categoryController.index)
route.post('/', restrict, categoryController.store)
route.post('/:id/update', restrict, categoryController.update)
route.get('/:id/destroy', restrict, categoryController.destroy)

module.exports = route
