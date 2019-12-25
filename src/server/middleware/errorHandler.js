import chalk from 'chalk'

export default function errorHandler (error, req, res, next) {
  if (error) {
    res
      .status(500)
      .json({ error, message: 'An internal server error occurred.' })
    console.error(chalk.red(`An internal server error occurred: ${error}`))
  } else {
    next()
  }
}
