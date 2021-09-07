const express = require('express')
const { restrict, catchErrors } = require('../handlers')

const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const transactionController = require('../controllers/transactionController')
const accountController = require('../controllers/accountController')

const router = express.Router()

router.get('/', restrict, catchErrors(homeController.index))

router.get('/login', catchErrors(authController.login))
router.post('/login', catchErrors(authController.loginStore))
router.get('/logout', catchErrors(authController.logout))
router.get('/register', catchErrors(authController.register))
router.post(
  '/register',
  authController.validateRegister,
  catchErrors(authController.registerStore)
)

router.get('/transactions', restrict, catchErrors(transactionController.index))
router.get(
  '/transactions/create',
  restrict,
  catchErrors(transactionController.create)
)
router.post(
  '/transactions',
  [restrict, transactionController.validateTransaction],
  catchErrors(transactionController.store)
)

router.get('/accounts', restrict, catchErrors(accountController.index))
router.post('/accounts', restrict, catchErrors(accountController.store))
router.post('/accounts/:id/update', restrict, catchErrors(accountController.update))
router.get('/accounts/:id/destroy', restrict, catchErrors(accountController.destroy))

module.exports = router
