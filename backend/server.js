const express = require('express')
const viewEngine = require('./src/config/viewEngine');

const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})