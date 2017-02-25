import del from 'del'
import gulp from 'gulp'
import babel from 'gulp-babel'
import cleanCSS from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import nodemon from 'gulp-nodemon'

// Build tasks
gulp.task('clean', callback => del('client/dist', callback))

gulp.task('css', ['clean'], _ => {
  return gulp.src(['!bower_components/**/*.css', '*.css'], {cwd: 'client/**'})
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/dist/'))
})

gulp.task('js', ['clean'], _ => {
  return gulp.src([
    '!bower_components/**/*.js',
    '!dist/*.js',
    '!lib/*.js',
    '*.js',
    'elements/**/*.js'
  ], {cwd: 'client/**'})
    .pipe(sourcemaps.init())
    .pipe(babel({minified: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/dist/'))
})

gulp.task('static', ['js'], _ => {
  return gulp.src([
    '!bower_components/**/index.html',
    'index.html',
    'manifest.json',
    'robots.txt',
    'spinner.png',
    'elements/movie-list.html',
    'elements/movie-list-item.html'
  ], {cwd: 'client/**'}).pipe(gulp.dest('client/dist/'))
})

gulp.task('static:watch', _ => {
  return gulp.src([
    '!bower_components/**/index.html',
    'index.html',
    'manifest.json',
    'robots.txt',
    'spinner.png',
    'elements/movie-list.html',
    'elements/movie-list-item.html'
  ], {cwd: 'client/**'}).pipe(gulp.dest('client/dist/'))
})

gulp.task('lib', ['static'], _ => {
  return gulp.src(['client/bower_components/custom-elements/src/native-shim.js'])
    .pipe(gulp.dest('client/dist/lib/'))
})

// Dev tasks
gulp.task('nodemon', ['build'], _ => {
  nodemon({
    script: 'index.js',
    ext: 'js',
    env: {'NODE_ENV': 'dev'},
    verbose: false,
    ignore: [],
    watch: ['server/*']
  })
})

// Watches
gulp.task('watch', ['build'], _ => {
  gulp.watch('client/**/*.js', ['js'])
  gulp.watch('client/**/*.css', ['css'])
  gulp.watch([
    'client/elements/*.html',
    'client/index.html',
    'client/manifest.json'
  ], event => gulp.src(event.path).pipe(gulp.dest('client/dist/')))
})

gulp.task('dev', ['build', 'nodemon', 'watch'])
gulp.task('build', ['clean', 'css', 'js', 'static', 'lib'])
gulp.task('default', ['dev'])
