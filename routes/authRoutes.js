const route = require('express').Router()
const { authController } = require('../controllers')
const { validateRegister } = require('../handlers')

route.get('/login', authController.login)
route.post('/login', authController.loginStore)
route.get('/logout', authController.logout)
route.get('/register', authController.register)
route.post('/register', validateRegister, authController.registerStore)

module.exports = route
