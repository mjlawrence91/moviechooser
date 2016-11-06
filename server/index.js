import fs from 'fs'
import path from 'path'
import config from 'config'
import chalk from 'chalk'
import spdy from 'spdy'
import {connect} from './modules/DBConnection'
import app from './app'

;(async function () {
  try {
    await connect()
  } catch (error) {
    console.error(chalk.red(error))
  }

  const port = config.get('server.port')
  const options = {
    key: fs.readFileSync(path.resolve(__dirname, '../certs/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../certs/cert.pem'))
  }

  spdy.createServer(options, app).listen(port, _ => console.log(chalk.blue(`Server open on port ${port}`)))
})()
