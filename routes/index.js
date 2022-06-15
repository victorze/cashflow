const router = require('express').Router()

router.use('/', require('./authRoutes'))
router.use('/', require('./homeRoutes'))
router.use('/transactions', require('./transactionRoutes'))
router.use('/accounts', require('./accountRoutes'))
router.use('/categories', require('./categoryRoutes'))

module.exports = router
