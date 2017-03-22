'use strict'

const { rollup } = require('rollup')
const babel = require('rollup-plugin-babel')

const entries = [
  'client/App.js',
  'client/elements/MovieList.js'
]

let cache

entries.forEach(async entry => {
  try {
    const bundle = await rollup({
      entry: `src/${entry}`,
      cache,
      plugins: [
        babel({
          babelrc: false,
          presets: ['es2015-rollup', 'babili']
        })
      ]
    })

    cache = bundle

    bundle.write({
      format: 'iife',
      moduleName: 'App',
      sourceMap: 'inline',
      dest: `dist/${entry}`
    })
  } catch (e) {
    console.error(e)
  }
})
