const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');

const BUILD_PATH = path.join(__dirname, 'app/');

let taskNames = [];

let tasksConfig = [{
    name: 'walletSrc',
    startPath: 'walletSrc/**/*.js',
    buildPath: path.join(BUILD_PATH, '/walletSrc')
}, {
    name: 'utils',
    startPath: 'utils/**/*.js',
    buildPath: path.join(BUILD_PATH, '/utils')
}, {
    name: 'main',
    startPath: 'main.js',
    buildPath: BUILD_PATH
}];

tasksConfig.forEach((taskConf) => {
    taskNames.push(taskConf.name);

    gulp.task(taskConf.name, function () {
        return gulp.src(taskConf.startPath)
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(gulp.dest(taskConf.buildPath));
    });
});

gulp.task('srcJson', function () {
    return gulp.src('walletSrc/**/*.json')
        .pipe(gulp.dest(path.join(BUILD_PATH, '/walletSrc')));
});
taskNames.push('srcJson');

gulp.task('default', gulp.series(...taskNames, function(done) {
    done();
}));
