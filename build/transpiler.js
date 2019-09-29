const { rollup } = require('rollup')
const { terser } = require('rollup-plugin-terser')

let cache
;(async () => {
  try {
    const bundle = await rollup({
      entry: 'src/client/App.js',
      cache,
      plugins: [terser()]
    })

    cache = bundle

    await bundle.write({
      format: 'iife',
      moduleName: 'App',
      sourceMap: 'inline',
      dest: 'dist/client/App.js'
    })
  } catch (e) {
    console.error(e)
  }
})()
