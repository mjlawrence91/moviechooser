export default function errorHandler (error, req, res, next) {
  if (error) {
    console.error(
      require('chalk').red(`An internal server error occurred: ${error}`)
    )

    return res
      .status(500)
      .json({ error, message: 'An internal server error occurred.' })
  }

  next()
}
