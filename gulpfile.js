var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('default', ['bower'],  function() {
  // place code for your default task here
});

var wiredep = require('wiredep').stream;

gulp.task('bower',  function () {
  gulp.src('./index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./'));
});

gulp.task('serve', ['bower'], function () {

  // Start browser process
  electron.start();

  // Restart browser process
  gulp.watch('main-new.js', electron.restart);

  // Reload renderer process
  gulp.watch(['js/**/*.js', 'index.html', 'src/**/*.html', 'css/**/*.css'], electron.reload);
});
