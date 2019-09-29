import fs from 'fs'
import path from 'path'

import config from 'config'
import chalk from 'chalk'
import { promisify } from 'util'
import spdy from 'spdy'

import { connect } from './modules/DBConnection'
import app from './app'
;(async function () {
  try {
    await connect()
  } catch (error) {
    console.error(chalk.red(error))
    return
  }

  const port = config.get('server.port')
  const isProduction = process.env.NODE_ENV !== 'dev'

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

    spdy.createServer(options, app).listen(port, _ => {
      console.log(chalk.blue(`Server open on port ${port}`))
    })
  }
})()
