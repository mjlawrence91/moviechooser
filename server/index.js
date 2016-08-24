import config from 'config'
import chalk from 'chalk'
import {connect} from './modules/DBConnection'
import app from './app'

;(async function () {
  try {
    await connect()
  } catch (error) {
    console.error(chalk.red(error))
  }

  const port = config.get('server.port')
  app.listen(port, () => console.log(chalk.blue(`Server open on port ${port}`)))
})()
