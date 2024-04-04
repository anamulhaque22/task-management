const { check } = require('express-validator')
const { User } = require('../../models')
const createHttpError = require('http-errors')

const loginValidator = [
    check('email')
        .toLowerCase()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 8 characters long')
]

const registerValidator = [
    check('name').notEmpty().withMessage('Name is required').trim().bail(),
    check('email')
        .toLowerCase()
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value) => {
            try {
                const result = await User.findOne({ email: value })
                console.log(result)
                if (result) {
                    console.log('Email already is user!')
                    throw createHttpError('Email already is user!')
                }
            } catch (error) {
                throw createHttpError(error.message)
            }
        })
        .bail(),

    check('password')
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage(
            'Password must be 6 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
        )
        .bail()
]

const refreshTokenValidator = [
    check('refreshToken')
        .notEmpty()
        .withMessage('Refresh token is required')
        .isString()
        .withMessage('Refresh token must be a string')
]

module.exports = {
    loginValidator,
    registerValidator,
    refreshTokenValidator
}
