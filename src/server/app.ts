import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'

import errorHandler from './middleware/errorHandler'
import routes from './routes'

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(compression())
app.use(cors({ origin: true }))
app.use(morgan('dev'))
app.use(errorHandler)

const isProduction = process.env.NODE_ENV !== 'dev'

if (!isProduction) {
  app.get('/debug', (req, res) => res.status(200).send('Hello World'))
}

// Movie routes.
app.get('/movies/:id?', routes.read)
app.post('/movies', routes.create)
app.delete('/movies/:id', routes.delete)

export default app
