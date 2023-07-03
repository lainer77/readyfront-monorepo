module.exports = {
    root: true,
    reportUnusedDisableDirectives: true,
    ignorePatterns: ['dist/*'],
    env: { browser: true, es2020: true, node: true },
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: 'detect' } },
    plugins: ['react-refresh'],
    extends: [
        '../../.eslintrc.js',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    rules: {
        'react-refresh/only-export-components': 'off',
        '@typescript-eslint/no-var-requires': 0,
    },
};
