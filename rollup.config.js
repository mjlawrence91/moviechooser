import rimraf from 'rimraf'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import json from 'rollup-plugin-json'

import minifyStyles from './build/minifyStyles'

// Clean dist directory.
rimraf.sync('dist')

// Build styles.
minifyStyles()

export default [
  {
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
          // { src: 'src/server/*', dest: 'dist/server' },
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
  },
  {
    input: 'src/server/index.js',
    output: {
      format: 'iife',
      name: 'app',
      sourcemap: 'inline',
      file: 'dist/server/index.js'
    },
    plugins: [
      babel(),
      nodeResolve({ preferBuiltins: true }),
      commonjs({
        namedExports: {
          '@firebase': ['initializeApp', 'database']
        }
      }),
      builtins(),
      json(),
      terser()
    ]
  }
]
