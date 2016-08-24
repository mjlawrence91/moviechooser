import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import serveStatic from 'serve-static'
import errorHandler from './middleware/errorHandler'
import routes from './routes'

const staticPath = (process.env.NODE_ENV !== 'dev')
  ? path.resolve(__dirname, '../client/dist')
  : path.resolve(__dirname, '../client')

const app = express()
app.set('x-powered-by', false)
app.use(bodyParser.json())
app.use(errorHandler)
app.use(serveStatic(staticPath))

app.get('/debug', (req, res) => res.status(200).send('Hello World'))
app.get('/api/movies/:id?', routes.read)
app.post('/api/movies', routes.create)
app.delete('/api/movies/:id', routes.delete)

export default app
