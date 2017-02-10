/* jshint: esversion: 6 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const bower = require('bower');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const sh = require('shelljs');
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const ngAnnotate = require('gulp-ng-annotate')
const compileHtmlTags = require('gulp-compile-html-tags');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');

gulp.task('default', ['watch']);

gulp.task('build', ['sass', 'css', 'html', 'js']);

gulp.task('sass', () => {
  const src = 'src/scss/**/*.scss';
  return gulp.src(src)
    .pipe(plumber())
    .pipe(sass()).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(gulp.dest('www/css'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('www/css'));
});

gulp.task('css', () => {
  const src = 'src/css/**/*.css';
  const dest = 'www/css';
  return gulp.src(src)
    .pipe(plumber())
    .pipe(changed(dest))
    .pipe(autoprefixer())
    .pipe(gulp.dest(dest));
});

gulp.task('html', () => {
  const src = 'src/templates/**/*.html';
  const dest = 'www/templates';
  return gulp.src(src)
    .pipe(plumber())
    .pipe(changed(dest))
    .pipe(compileHtmlTags('style', (tag, data) => {
      return data.pipe(sass()).on('error', sass.logError)
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/js'))
});

gulp.task('install', ['git-check'], () => {
  return bower.commands.install()
    .on('log', (data) => {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', done => {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('clean:www', () => {
  return del([
    'www/css/**/*',
    'www/templates/**/*',
    'www/js/**/*'
  ])
});

gulp.task('clean', ['clean:www']);

gulp.task('watch', [
  'watch:sass',
  'watch:css',
  'watch:html',
  'watch:js'
]);

gulp.task('watch:sass', ['sass'], () => {
  return gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('watch:css', ['css'], () => {
  return gulp.watch('src/css/**/*.css', ['css']);
});

gulp.task('watch:html', ['html'], () => {
  return gulp.watch('src/templates/**/*.html', ['html']);
});

gulp.task('watch:js', ['js'], () => {
  return gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('test', done => {
  karma.start({
      configFile: __dirname + '/tests/my.conf.js',
      singleRun: true
  }, done);
});
