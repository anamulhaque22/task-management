const httpStatus = require('http-status')
const userService = require('./user.service')
const ApiError = require('../utils/ApiError')
const tokenService = require('./token.service')
const { tokenTypes } = require('../config/tokens')

const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email)
    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            'Incorrect email or password'
        )
    }

    return user
}

const refreshAuth = async (refreshToken) => {
    console.log({ refreshToken })
    try {
        const refreshTokenDecoded = await tokenService.verifyToken(refreshToken)
        console.log({ refreshTokenDecoded })
        return tokenService.generateAuthTokens(refreshTokenDecoded)
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
    }
}

module.exports = {
    loginUserWithEmailAndPassword,
    refreshAuth
}
