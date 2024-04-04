const express = require('express')
const authRoute = require('./auth.route')
const tasksRoute = require('./tasks.route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/tasks',
        route: tasksRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
