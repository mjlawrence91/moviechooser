import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import dot from 'dot'

const staticPath = path.resolve(__dirname, '../../client')
const readFile = promisify(fs.readFile)

async function injectInlineStyles (req, res) {
  // Read inline styles
  const stylesBuffer = await readFile(`${staticPath}/styles/inline-styles.css`)
  const styles = stylesBuffer.toString('utf-8')

  // Read index.html
  const htmlBuffer = await readFile(`${staticPath}/index.html`)
  const html = htmlBuffer.toString('utf-8')

  // Inject inline styles into index.html and serve
  const template = dot.template(html)
  const injectedHtml = template({ styles })
  res.send(injectedHtml)
}

export default injectInlineStyles
