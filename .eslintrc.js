module.exports = {
    root: true,
    extends: ['plugin:vue/essential', '@vue/standard'],
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/no-parsing-error': [2, {'x-invalid-end-tag': false}],
        'no-undef': 'off',
        'no-useless-escape': 1,
        'space-return-throw-case': 4,
        'indent': ["error", 4, { SwitchCase: 1 }],
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
