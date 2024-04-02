/* eslint-disable no-undef */
//internal imports
const app = require('./app')

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.dir(`App is listing to port ${process.env.PORT}`)
})
