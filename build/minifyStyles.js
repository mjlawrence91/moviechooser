'use strict'

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const CleanCSS = require('clean-css')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const inPath = path.join(__dirname, '..', 'src', 'client', 'styles')
const outPath = path.join(__dirname, '..', 'dist')

const files = [
  {
    in: path.join(inPath, 'inline-styles.css'),
    out: path.join(outPath, 'client', 'styles', 'inline-styles.css')
  },
  {
    in: path.join(inPath, 'main-styles.css'),
    out: path.join(outPath, 'client', 'styles', 'styles.css')
  }
]

files.forEach(async file => {
  const buffer = await readFile(file.in)
  const styles = buffer.toString('utf-8')

  const output = new CleanCSS().minify(styles)
  await writeFile(file.out, output.styles, 'utf-8')
})
