import rimraf from 'rimraf'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import minifyStyles from './build/minifyStyles'

// Clean dist directory.
rimraf.sync('dist')

// Build styles.
minifyStyles()

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
        { src: 'config/**', dest: 'dist/config' },
        {
          src: [
            'src/client/*',
            '!src/client/elements',
            '!src/client/utils',
            '!src/client/styles'
          ],
          dest: 'dist/client'
        }
      ]
    })
  ]
}
