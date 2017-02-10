import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import serveStatic from 'serve-static'
import compression from 'compression'
import cors from 'cors'
import errorHandler from './middleware/errorHandler'
import routes from './routes'
import whos from './routes/whos'

const isProduction = (process.env.NODE_ENV !== 'dev')
const staticPath = (isProduction)
  ? path.resolve(__dirname, '../client/dist')
  : path.resolve(__dirname, '../client')

const app = express()
app.set('x-powered-by', false)
app.use(bodyParser.json())
app.use(compression())
app.use(serveStatic(staticPath))
app.use(cors())
app.use(errorHandler)

if (!isProduction) {
  app.get('/debug', (req, res) => res.status(200).send('Hello World'))
}

app.get('/api/whos/:id?', whos.read)

app.get('/api/movies/:id?', routes.read)
app.post('/api/movies', routes.create)
app.delete('/api/movies/:id', routes.delete)

export default app
