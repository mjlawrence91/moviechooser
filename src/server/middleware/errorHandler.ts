import { Request, Response, NextFunction } from 'express'
import chalk from 'chalk'

export default function errorHandler (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    res
      .status(500)
      .json({ error, message: 'An internal server error occurred.' })
    console.error(chalk.red(`An internal server error occurred: ${error}`))
  } else {
    next()
  }
}
