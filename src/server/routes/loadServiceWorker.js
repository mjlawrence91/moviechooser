import fs from 'fs/promises'
import path from 'path'

const staticPath = path.resolve(__dirname, '../../client')

export default async function loadServiceWorker (req, res) {
  const serviceWorker = await fs.readFile(`${staticPath}/sw.js`).then(buffer =>
    buffer.toString('utf-8')
  )

  res.set('Content-Type', 'application/javascript')
  res.send(serviceWorker)
}
