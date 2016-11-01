
// Karma configuration

module.exports = function(config) {
    config.set({

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'bower_components/json3/lib/json3.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/lodash/lodash.js',
            'bower_components/sprintf/src/sprintf.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',
            'bower_components/angular-messages/angular-messages.js',
            'bower_components/moment/moment.js',
            'bower_components/angular-moment/angular-moment.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/ng-file-upload/ng-file-upload.js',
            'bower_components/angular-mocks/angular-mocks.js',
            // endbower

            // Production code - reference the unannotated code so we don't need to run ngAnnotate for tests
            'target/generated-sources/temp/javascript/app.js',
            'target/generated-sources/temp/javascript/**/*.js',

            // Tests
            'target/generated-test-sources/javascript/**/*.js'
        ],

        autoWatch: true,

        browsers: ['PhantomJS'],

        logLevel: config.LOG_INFO,

        plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
    });
};