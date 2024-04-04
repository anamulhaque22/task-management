const express = require('express')
const authController = require('../controllers/auth.controller')
const {
    loginValidator,
    refreshTokenValidator,
    registerValidator
} = require('../middlewares/validation/auth.validation')
const handleValidationErrors = require('../middlewares/validation/handleValidationErrors')

const router = express.Router()

router.post(
    '/register',
    registerValidator,
    handleValidationErrors,
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
