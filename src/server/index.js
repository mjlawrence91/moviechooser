import https from 'https'
import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import { promisify } from 'util'

import config from './utils/config'
import app from './app'
;(async function () {
  // Look for PORT env variable first, for Heroku deployment.
  const port = config.get('PORT') || config.get('SERVER_PORT')
  const isProduction = config.get('NODE_ENV') !== 'dev'

  if (isProduction) {
    app.listen(port, () =>
      console.log(chalk.blue(`Server open on port ${port}`))
    )
  } else {
    const readFile = promisify(fs.readFile)

    const options = {
      key: await readFile(path.resolve(__dirname, '../../certs/key.pem')),
      cert: await readFile(path.resolve(__dirname, '../../certs/cert.pem'))
    }

    https.createServer(options, app).listen(port, () => {
      console.log(chalk.blue(`Server open on port ${port}`))
    })
  }

  process.on('SIGINT', () => process.exit(0))
})()
