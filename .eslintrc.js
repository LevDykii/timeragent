// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    env: {
        browser: true,
        // mocha: true,
    },
    extends: 'airbnb-base',
    // required to lint *.vue files
    plugins: [
        'html',
    ],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            'webpack': {
                'config': './build/webpack.test.conf.js',
            },
        },
    },
    globals: {
        expect: true,
        sinon: true,
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        'import/extensions': ['error', 'always', {
            js: 'never',
            vue: 'never',
        }],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': ['error', {
            'optionalDependencies': ['test/unit/index.js']
        }],
        'semi': ['error', 'always'],
        'key-spacing': ["error", { "align": "colon" }],
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'function-paren-newline': ['error', 'consistent'],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'indent': ['error', 4],
    },
};