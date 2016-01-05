var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
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

//////////DEPENDENCY INJECTION FUNCTIONS//////////

//Injects All Bower Dependencies & Source JS files. (relative: True)
gulp.task('Inject-Javascript', function () {
  log("Inject Javascript Dependencies");
  var options = config.getWireDepDevOptions();
  var wiredep = require('wiredep').stream;

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.srcjs), {relative: true}))
    .pipe($.inject(gulp.src(config.addonjs, {read: false}), {
      relative: true,
      starttag: '<!-- inject:addons:js -->'
    }))
    .pipe(gulp.dest(config.source));
});

//Injects CSS generated from tmp (relative: True)
gulp.task('Inject-CSS', ['styles'], function () {
  log('Inject CSS Dependencies');
  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css), {relative: true}))
    .pipe($.inject(gulp.src(config.addoncss, {read: false}), {
      starttag: '<!-- inject:addons:css -->',
      relative: true
    }))
    .pipe(gulp.dest(config.source));
});


//////////CLEAN FUNCTIONS//////////
//Delete Confilg.Tmp
gulp.task('clean-temp', function () {
  log("Clean Temp Styles");
  var files = config.temp;

  clean(files, function () {
    return gulp
  });

});

//Delete Confilg.Build
gulp.task('clean', ['clean-temp'], function () {
  clean(config.build, function () {
    return gulp;
  });
});

//////////COPY FUNCTIONS//////////
//Combine multiple copy functions to one
gulp.task('copy', ['move-css']);

//Copy Fonts dir to Compile.Build
gulp.task('move-fonts', function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure

  log("Moving Fonts files to build folder");


  return gulp.src(config.fonts)
    .pipe(gulp.dest(config.build + "fonts"));
});

//Copy Img dir to Compile.Build
gulp.task('move-img', function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure

  log("Moving imgs files to build folder");

  return gulp.src(config.images)
    .pipe(gulp.dest(config.build + "Images"));
});

//Copy Img dir to Compile.Build
gulp.task('move-css', ['styles'], function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure

  log("Moving css files to build folder");

  return gulp.src(config.css)
    .pipe(gulp.dest(config.build + "css"))
    .pipe($.cssmin())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(config.build + "css"));
});


//////////COMPILE FUNCTIONS//////////

//Compiles Less Styles to CSS in Confg.temp
gulp.task('styles', function () {
  log("Compiling Less --> CSS ");
  return gulp
    .src(config.less.compile)
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe(gulp.dest(config.temp));
});

//ngAnnotate - Makes sure all Angular code is Min Compliant
gulp.task('ngAnnotate', function () {
  log('Looks through source files and adds DI');
  return gulp.src(config.srcjs)
    .pipe($.ngAnnotate())
    .pipe(gulp.dest(config.source))
});

//Generates $templateCache JS based on HTML files
gulp.task('templateCache', function () {
  log("Creating Angular JS Templates");
  return gulp.src(config.html)
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache(
      config.templates.file,
      config.templates.options
    ))
    .pipe(gulp.dest(config.temp));
});


//////////WATCHERS FUNCTIONS//////////

//Dev JS Watcher for JS Changes and rebuild
gulp.task('js-watch', ['default'], function () {
  gulp.watch(config.alljs, ['default']);
});

//Less Watcher that will recompile on changes
gulp.task('less-watch', function () {
  gulp.watch(config.less.watch, ['styles']);
});


//////////HELPER FUNCTIONS//////////
function clean(files, done) {
  log("Cleaning Files");
  var del = require('del');
  del(files, done);
}

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));

      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}


