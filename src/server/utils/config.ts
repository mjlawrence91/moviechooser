import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export default {
  get (key: string) {
    if (!process.env[key]) {
      return null
    }

    return process.env[key]
  },

  has (key: string) {
    return !!process.env[key]
  }
}
