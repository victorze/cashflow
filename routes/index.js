require('express-async-errors')
const router = require('express').Router()

router.use('/', require('./authRoutes'))
router.use('/', require('./appRoutes'))

module.exports = router
