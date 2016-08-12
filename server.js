const express = require('express')
const serveStatic = require('serve-static')
const app = express()

const port = 8000

app.use(serveStatic(__dirname))

app.listen(port, () => console.log(`Server open on port ${port}`))
