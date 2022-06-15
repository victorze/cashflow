const route = require('express').Router()
const { homeController } = require('../controllers')
const { restrict } = require('../handlers')

route.get('/', restrict, homeController.index)

module.exports = route
