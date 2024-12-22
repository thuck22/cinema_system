const express = require('express')
const viewEngine = require('./config/viewEngine');
const cors = require("cors")
const initWebRoutes = require('./route/app')
const bodyParser = require('body-parser')

const app = express()
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000
viewEngine(app)
initWebRoutes(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
