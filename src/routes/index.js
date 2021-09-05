const express = require('express')
const { restrict, catchErrors } = require('../handlers')

const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const transactionController = require('../controllers/transactionController')

const router = express.Router()

router.get('/', restrict, catchErrors(homeController.index))

router.get('/login', catchErrors(authController.login))
router.post('/login', catchErrors(authController.loginStore))
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

module.exports = router
