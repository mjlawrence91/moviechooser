const path = require('path')
const express = require('express')
const serveStatic = require('serve-static')
const app = express()
const port = 8000

const staticPath = process.env.NODE_ENV === 'prod'
  ? path.join(__dirname, '/dist')
  : __dirname

app.set('x-powered-by', false)
app.use(serveStatic(staticPath))

app.listen(port, _ => console.log(`Server open on port ${port}`))
