const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const authService = require('../services/auth.service')
const tokenService = require('../services/token.service')
const userService = require('../services/user.service')

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body)
    res.status(httpStatus.CREATED).send({ user })
})

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const user = await authService.loginUserWithEmailAndPassword(
        email,
        password
    )
    console.log(user)
    const tokens = await tokenService.generateAuthTokens(user)
    res.send({
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        },
        tokens
    })
})

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken)
    res.send({ ...tokens })
})

module.exports = {
    login,
    register,
    refreshTokens
}
