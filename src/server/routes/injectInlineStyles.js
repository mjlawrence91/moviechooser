import fs from 'fs/promises'
import path from 'path'
import ejs from 'ejs'

const staticPath = path.resolve(__dirname, '../../client')

async function injectInlineStyles (req, res) {
  // Read in inline styles.
  const stylesBuffer = await fs.readFile(`${staticPath}/styles/inline-styles.css`)
  const styles = `<style>${stylesBuffer.toString('utf-8')}</style>`

  // Read in index.template.ejs.
  const htmlBuffer = await fs.readFile(`${staticPath}/index.template.ejs`)
  const html = htmlBuffer.toString('utf-8')

  // Inject inline styles into HTML and serve.
  const template = ejs.compile(html)
  const injectedHtml = template({ styles })
  res.send(injectedHtml)
}

export default injectInlineStyles
