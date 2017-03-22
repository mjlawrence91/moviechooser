import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import errorHandler from './middleware/errorHandler'
import routes from './routes'
import whos from './routes/whos'
import injectInlineStyles from './routes/injectInlineStyles'

const isProduction = (process.env.NODE_ENV !== 'dev')
const staticPath = path.resolve(__dirname, '../client')

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(compression())
app.use(cors())
app.use(errorHandler)

if (!isProduction) {
  app.get('/debug', (req, res) => res.status(200).send('Hello World'))
}

// Serve static files
const topLevelSection = /([^/]*)(\/|\/index.html)$/
app.get(topLevelSection, injectInlineStyles)
app.use(express.static(staticPath))

// Whos routes
app.get('/api/whos/:id?', whos.read)

// Movie routess
app.get('/api/movies/:id?', routes.read)
app.post('/api/movies', routes.create)
app.delete('/api/movies/:id', routes.delete)

export default app
