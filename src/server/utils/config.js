import dotenv from 'dotenv'

dotenv.config()

export default {
  get (key) {
    if (!process.env[key]) {
      return null
    }

    return process.env[key]
  },

  has (key) {
    return !!process.env[key]
  }
}
