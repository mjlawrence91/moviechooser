import rimraf from 'rimraf'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'

import buildStyles from './build/buildStyles'

// Clean and recreate dist directory.
rimraf.sync('dist')

// Build styles and inject inline styles into HTML.
buildStyles()

export default {
  input: 'src/client/App.js',
  output: {
    format: 'iife',
    name: 'App',
    sourcemap: 'inline',
    file: 'dist/client/App.js'
  },
  watch: {
    clearScreen: false,
    exclude: 'dist/**',
    include: 'src/client/**'
  },
  plugins: [
    terser(),
    copy({
      copyOnce: true,
      targets: [
        { src: 'index.js', dest: 'dist' },
        { src: 'src/server/*', dest: 'dist/server' },
        {
          src: [
            'src/client/*',
            '!src/client/elements',
            '!src/client/utils',
            '!src/client/styles',
            '!src/client/index.template.ejs'
          ],
          dest: 'dist/client'
        }
      ]
    })
  ]
}
