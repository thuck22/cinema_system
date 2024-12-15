const express = require('express')
const viewEngine = require('./config/viewEngine');
const initWebRoutes = require('./route/app')

const app = express()
const port = 8000
viewEngine(app)
initWebRoutes(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})