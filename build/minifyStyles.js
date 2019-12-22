const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const CleanCSS = require('clean-css')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

export default async function minifyStyles () {
  const inPath = path.join(__dirname, 'src/client/styles')
  const outPath = path.join(__dirname, 'dist')

  await mkdir(path.join(outPath, 'client/styles'), { recursive: true })

  const files = [
    {
      in: path.join(inPath, 'inline-styles.css'),
      out: path.join(outPath, 'client/styles/inline-styles.css')
    },
    {
      in: path.join(inPath, 'main-styles.css'),
      out: path.join(outPath, 'client/styles/styles.css')
    }
  ]

  files.forEach(async file => {
    const styles = await readFile(file.in, { encoding: 'utf-8' }).catch(error =>
      console.error(`Error reading file: ${error}`)
    )

    const output = new CleanCSS().minify(styles)

    await writeFile(file.out, output.styles, 'utf-8').catch(error =>
      console.error(`Error writing file: ${error}`)
    )
  })
}
