import https from 'https'
import fs from 'fs'
import path from 'path'
import util from 'util'

import config from './utils/config'
import app from './app'
;(async function () {
  const isProduction = config.get('NODE_ENV') !== 'dev'

  // Look for PORT env variable first, for Heroku deployment.
  const port = config.get('PORT') || config.get('SERVER_PORT')

  const logServerOpen = () => {
    const chalk = require('chalk')
    console.log(chalk.blue(`Server open on port ${port}`))
  }

  if (isProduction) {
    app.listen(port, logServerOpen)
  } else {
    const readFile = util.promisify(fs.readFile)

    const options = {
      key: await readFile(path.resolve(__dirname, '../../certs/key.pem')),
      cert: await readFile(path.resolve(__dirname, '../../certs/cert.pem'))
    }

    https.createServer(options, app).listen(port, logServerOpen)
  }

  process.on('SIGINT', () => process.exit(0))
})()
