// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

const webpackConfig = require('../../build/webpack.test.conf');

module.exports = function moduleExports(config) {
    config.set({
        // to run in additional browsers:
        // 1. install corresponding karma launcher
        //    http://karma-runner.github.io/0.13/config/browsers.html
        // 2. add it to the `browsers` array below.
        browsers     : ['PhantomJS'],
        frameworks   : ['mocha', 'phantomjs-shim', 'sinon'],
        reporters    : ['spec', 'coverage'],
        plugins : [
            'karma-mocha',
        ],
        files        : [
            '../../node_modules/es6-promise/dist/es6-promise.auto.js',
            './index.js'
        ],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap'],
        },
        webpack          : webpackConfig,
        webpackMiddleware: {
            noInfo: true,
        },
        coverageReporter: {
            dir      : './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' },
            ],
        },
    });
};
