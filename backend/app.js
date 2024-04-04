// Basic lib
const express = require('express')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')
const app = new express()

const dotenv = require('dotenv')
dotenv.config()

const httpStatus = require('http-status')
const ApiError = require('./src/utils/ApiError')
const { errorConverter, errorHandler } = require('./src/middlewares/error')
const router = require('./src/routes')

// set security HTTP headers
app.use(helmet())
// sanitize request data
app.use(mongoSanitize())

// parse json request body
app.use(express.json())
// parse urlencoded request body
app.use(express.urlencoded({ extended: false }))

// request rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter)

// enable cors
app.use(cors({ credentials: true, origin: true }))
app.options('*', cors())

// Mongodb database connection
mongoose
    // eslint-disable-next-line no-undef
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Db Connected.'))
    .catch((err) => {
        console.log(err)
    })

// eslint-disable-next-line no-undef

// eslint-disable-next-line no-undef
app.use(express.static(__dirname + '/public'))
app.use('/uploads', express.static('uploads'))

// Routing
app.use('/api/v1', router)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

module.exports = app
