import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const staticPath = path.resolve(__dirname, '../../client')
const readFile = promisify(fs.readFile)

export default async function loadServiceWorker (req, res) {
  const serviceWorker = await readFile(`${staticPath}/sw.js`)
    .then(buffer => buffer.toString('utf-8'))

  res.set('Content-Type', 'application/javascript')
  res.send(serviceWorker)
}
