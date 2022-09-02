const fs = require('fs/promises')
const path = require('path')
const CleanCSS = require('clean-css')

export default async function minifyStyles () {
  const inPath = path.join(__dirname, 'src/client/styles')
  const outPath = path.join(__dirname, 'dist')

  await fs.mkdir(path.join(outPath, 'client/styles'), { recursive: true })

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
    const styles = await fs.readFile(file.in, { encoding: 'utf-8' }).catch(error =>
      console.error(`Error reading file: ${error}`)
    )

    const output = new CleanCSS().minify(styles)

    await fs.writeFile(file.out, output.styles, 'utf-8').catch(error =>
      console.error(`Error writing file: ${error}`)
    )
  })
}
