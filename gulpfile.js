import fs from 'fs';

import autoprefixer from 'gulp-autoprefixer';
import browserify from 'browserify';
import cleanCSS from 'gulp-clean-css';
import dartSass from 'sass';
import { deleteAsync } from 'del';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';

const { dest, series, src, watch } = gulp;

const paths = {
  styles: {
    src: 'assets/sass/style.scss',
    dest: 'static',
    watch: 'assets/sass/*.scss',
  },
  js: {
    src: 'assets/js/main.js',
    dest: 'static/bundle.js',
    watch: 'assets/js/*.js',
  },
};

const sass = gulpSass(dartSass);

const clean = () => deleteAsync('static');

const styles = () =>
  src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(paths.styles.dest));

const js = () =>
  browserify(paths.js.src)
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(fs.createWriteStream(paths.js.dest));

const watchFiles = () => {
  watch(paths.styles.watch, styles);
  watch(paths.js.watch, js);
};

export default series(clean, styles, js, watchFiles);

export const build = (clean, styles, js);
