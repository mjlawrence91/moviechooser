import { promises as fs } from 'fs'
import path from 'path'

import CleanCSS from 'clean-css'
import ejs from 'ejs'

export default async function buildStyles () {
  return fs
    .mkdir('dist/client', { recursive: true })
    .then(() => buildMainStyles())
    .then(() => injectInlineStyles())
}

async function buildMainStyles () {
  await fs.mkdir(path.join(__dirname, 'dist/client', 'styles'), {
    recursive: true
  })

  const inPath = path.join(__dirname, 'src/client/styles/main-styles.css')
  const outPath = path.join(__dirname, 'dist/client/styles/styles.css')

  return readStyles(inPath)
    .then((styles) => minifyStyles(styles))
    .then((styles) => writeNewFile(styles, outPath))
}

async function injectInlineStyles () {
  const srcPath = path.resolve(__dirname, 'src/client')
  const distPath = path.resolve(__dirname, 'dist/client')

  const inlineStylesPath = path.resolve(srcPath, 'styles/inline-styles.css')

  return readStyles(inlineStylesPath)
    .then((styles) => minifyStyles(styles))
    .then(async (styles) => {
      const html = await readHTMLTemplate(srcPath)
      return compileTemplate(html, styles)
    })
    .then((html) => writeNewFile(html, `${distPath}/index.html`))
}

async function readStyles (path) {
  return fs
    .readFile(path, {
      encoding: 'utf-8'
    })
    .catch((error) => console.error(`Error reading file: ${error}`))
}

async function readHTMLTemplate (path) {
  return fs
    .readFile(`${path}/index.template.ejs`, {
      encoding: 'utf-8'
    })
    .catch((error) => console.error(`Error reading template: ${error}`))
}

function compileTemplate (html, styles) {
  const template = ejs.compile(html)
  const injectedHtml = template({ styles: `<style>${styles}</style>` })
  return Promise.resolve(injectedHtml)
}

function minifyStyles (styles) {
  const { styles: newStyles } = new CleanCSS().minify(styles)
  return Promise.resolve(newStyles)
}

async function writeNewFile (content, path) {
  return fs
    .writeFile(path, content, 'utf-8')
    .catch((error) => console.error(`Error writing file: ${error}`))
}
