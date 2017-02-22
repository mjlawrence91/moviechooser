#! /usr/bin/node
import path from 'path'
import {mkdir, cp} from 'shelljs'
import chalk from 'chalk'

const rootPath = path.resolve(__dirname, '../../', 'client')

const files = [
  'index.html',
  'manifest.json',
  'style.css',
  'robots.txt',
  'spinner.png'
]

const paths = files.map(file => rootPath + '/' + file)
cp(...paths, path.join(rootPath, 'dist'))

const elementFiles = [
  'elements/movie-list.html',
  'elements/movie-list-item.html'
]

// Even passing the -R flag doesn't put the element HTML files in the
// dist/elements directory, so doing it separately.
const elementPaths = elementFiles.map(file => rootPath + '/' + file)
cp('-R', ...elementPaths, path.join(rootPath, 'dist/elements'))

// Include native-shim.js so that v1 custom elements work when transpiled
const nativeShimPath = path.join(rootPath, 'bower_components/custom-elements/src/native-shim.js')
mkdir('-p', path.join(rootPath, 'dist/lib'))
cp('-R', nativeShimPath, path.join(rootPath, 'dist/lib'))

console.log(chalk.green('All static assets built.'))
