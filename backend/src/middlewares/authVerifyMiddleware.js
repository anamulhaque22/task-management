const jwt = require('jsonwebtoken')
const { tokenTypes } = require('../config/tokens')
const httpStatus = require('http-status')

function authVerifyMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: 'failed',
            message: 'No token provided. Authentication failure!'
        })
    }

    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.error('JWT verification failed:', err.message)
            return res.status(httpStatus.FORBIDDEN).json({
                errors: 'Invalid token!'
            })
        }

        if (decodedToken.type !== tokenTypes.ACCESS) {
            return res
                .status(httpStatus.FORBIDDEN)
                .json({ error: 'Invalid Token Type' })
        }
        // Attach the decoded token payload to req.user
        req.user = decodedToken

        // Continue to the next middleware or route handler
        next()
    })
}

module.exports = authVerifyMiddleware
