import browserSync from 'browser-sync'
import del from 'del'
import gulp from 'gulp'
import cleanCSS from 'gulp-clean-css'
import nodemon from 'gulp-nodemon'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import vulcanize from 'gulp-vulcanize'

// Build tasks
gulp.task('clean', callback => {
  del('client/dist', callback)
})

gulp.task('css', _ => {
  return gulp.src('!bower_components/**/*.css', 'client/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/dist/**'))
})

gulp.task('js', _ => {
  return gulp.src(['!bower_components/**/*.js', '!client/lib/*.js', 'client/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/dist/**'))
})

gulp.task('vulcanize', _ => {
  return gulp.src('client/**/*.html')
    .pipe(vulcanize({
      stripComments: true,
      inlineScripts: true,
      inlineCss: true
    }))
    .pipe(gulp.dest('client/dist/**'))
})

// Dev tasks
gulp.task('nodemon', _ => {
  const nodemonOptions = {
    script: 'index.js',
    ext: 'js',
    env: {'NODE_ENV': 'dev'},
    verbose: false,
    ignore: [],
    watch: ['server/*']
  }

  nodemon(nodemonOptions).on('restart', _ => {
    console.log('restarted!')
  })
})

gulp.task('browser-sync', _ => {
  browserSync.init({
    proxy: 'https://localhost:8000',
    files: ['client/**/*.*'],
    browser: 'google chrome canary'
  })
})

gulp.task('watch', _ => {
  gulp.watch('client/**/*.js').on('change', browserSync.reload)
  gulp.watch('client/**/*.css').on('change', browserSync.reload)
  gulp.watch('client/**/*.html').on('change', browserSync.reload)
})

gulp.task('dev', ['nodemon', 'browser-sync', 'watch'])
gulp.task('build', ['clean', 'css', 'js', 'vulcanize'])
gulp.task('default', ['build'])
