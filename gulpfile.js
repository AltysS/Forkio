import gulp from "gulp";
import clean from "gulp-clean";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import concat from "gulp-concat";
import minify from "gulp-minify";
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";
const BS = browserSync.create();
const sass = gulpSass(dartSass);

const moveJS = () => {
  return gulp.src("./src/js/all-min.js").pipe(gulp.dest("./dist/JS"));
};

export const moveHTML = () => {
  return gulp.src("./src/index.html").pipe(gulp.dest("./dist"));
};

const cleanFiles = () => {
  return gulp
    .src(["./dist/*.html", "./src/js/*.js", "./src/styles/*.css"], {
      read: false,
    })
    .pipe(clean());
};

const convertCss = () => {
  return gulp
    .src("./src/styles/SCSS/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/styles"));
};

const prefixCss = () => {
  return gulp
    .src("./src/styles/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("./dist/styles"));
};

// activate once dev will be finished

// export const cleanCSSCode = () => {
//   return gulp
//     .src("./src/styles/main.css")
//     .pipe(cleanCSS({ compatibility: "ie8" }))
//     .pipe(gulp.dest("./src/styles"));
// };

const concatJsFiles = () => {
  return gulp
    .src("./src/js/**/*")
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./src/js"));
};
const minifyJs = () => {
  return gulp.src("./src/js/all.js").pipe(minify()).pipe(gulp.dest("./src/js"));
};

export const minifyIMG = () => {
  return gulp
    .src("./src/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/IMG/"));
};

export const build = gulp.series(
  cleanFiles,
  convertCss,
  prefixCss,
  concatJsFiles,
  minifyJs,
  // minifyIMG,
  moveJS,
  moveHTML
);

// export const dev = () => {
//   browserSync.init({
//     server: {
//       baseDir: "./dist",
//     },
//   });
//   gulp.watch(
//     ["./src/styles/SCSS/**/*.scss", "./src/*.html"],
//     gulp.series(build, (done) => {
//       BS.reload();
//       done();
//     })
//   );
// };

export const dev = () => {
  minifyIMG();
  BS.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch(
    [
      "./src/index.html",
      "./src/styles/SCSS/**/*.scss",
      "./src/js/js-scripts/**/*.js",
    ],
    gulp.series(build, (done) => {
      BS.reload();
      done();
    })
  );
};
