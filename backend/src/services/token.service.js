const jwt = require('jsonwebtoken')
const moment = require('moment')
const { tokenTypes } = require('../config/tokens')

const generateToken = (
    userId,
    expires,
    type,
    // eslint-disable-next-line no-undef
    secret = process.env.JWT_SECRET
) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type
    }
    return jwt.sign(payload, secret)
}

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(
        // eslint-disable-next-line no-undef
        process.env.JWT_ACCESS_EXPIRATION_MINUTES,
        'minutes'
    )
    const accessToken = generateToken(
        { id: user.id, email: user.email },
        accessTokenExpires,
        tokenTypes.ACCESS
    )

    const refreshTokenExpires = moment().add(
        // eslint-disable-next-line no-undef
        process.env.JWT_REFRESH_EXPIRATION_DAYS,
        'days'
    )
    const refreshToken = generateToken(
        { id: user.id, email: user.email },
        refreshTokenExpires,
        tokenTypes.REFRESH
    )

    return {
        accessToken,
        refreshToken
    }
}

const verifyToken = (token) => {
    // eslint-disable-next-line no-undef
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    generateToken,
    generateAuthTokens,
    verifyToken
}
