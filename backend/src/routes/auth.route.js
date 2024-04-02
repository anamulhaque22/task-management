const express = require('express')
const authController = require('../controllers/auth.controller')
const {
    loginValidator,
    refreshTokenValidator
} = require('../middlewares/validation/auth.validation')
const handleValidationErrors = require('../middlewares/handleValidationErrors')

const router = express.Router()

router.post(
    '/register',

    authController.register
)
router.post(
    '/login',
    loginValidator,
    handleValidationErrors,
    authController.login
)

router.post(
    '/refresh-tokens',
    refreshTokenValidator,
    handleValidationErrors,
    authController.refreshTokens
)

module.exports = router
