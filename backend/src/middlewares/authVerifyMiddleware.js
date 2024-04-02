const jwt = require('jsonwebtoken')

function authVerifyMiddleware(req, res, next) {
    const token = req.headers['token']

    if (!token) {
        return res.status(401).json({
            status: 'failed',
            message: 'No token provided. Authentication failure!'
        })
    }

    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.error('JWT verification failed:', err.message)
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid token. Authentication failure!'
            })
        }

        // Attach the decoded token payload to req.user
        req.user = decodedToken

        // Continue to the next middleware or route handler
        next()
    })
}

module.exports = authVerifyMiddleware
