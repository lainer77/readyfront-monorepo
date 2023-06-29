module.exports = {
    env: { browser: true, es2020: true, node: true },
    extends: [
        'eslint:recommended',
        // 상위 확장과 충돌
        // 'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: ['react-refresh'],
    ignorePatterns: ['dist', 'dist.types'],
    rules: {
        'react-refresh/only-export-components': 'warn',
    },
};
