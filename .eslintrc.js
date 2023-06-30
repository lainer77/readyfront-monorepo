module.exports = {
    root: true,
    plugins: ['react', 'prettier', 'perfectionist', 'html'],
    extends: ['eslint:recommended', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        // perfectionist 와 충돌되는 규칙
        'import/order': 'off',
        'sort-imports': 'off',
    },
    ignorePatterns: [
        'build',
        'dist',
        'node_modules',
        'package.json',
        'tsconfig.json',
        'tsconfig.node.json',
        '.eslintrc.*',
        'LICENSE',
        '.md',
        'jest.config.js',
        'manifest.json',
        'next.config.js',
        // 하위 종속성 eslint 버전차이로 임시 제외
        'vite-ssr-project',
    ],
    overrides: [
        {
            files: ['**/*.ts?(x)', '**/*.js?(x)'],
            plugins: ['@typescript-eslint'],
            settings: {
                react: {
                    version: 'detect',
                },
            },
            /**
             * "parser": "@typescript-eslint/parser" - TypeScript ESLint parser를 사용하도록 설정합니다. 이 설정은 TypeScript와 함께 ESLint를 사용할 때 필요합니다. \
             * "parserOptions.project": "./tsconfig.json" - TypeScript 설정 파일의 경로를 지정합니다. 이 설정은 TypeScript ESLint parser가 TypeScript 타입 체크 정보를 사용하도록 합니다. \
             * "parserOptions.tsconfigRootDir": __dirname - TypeScript 설정 파일이 있는 디렉토리의 경로를 지정합니다. __dirname은 현재 파일이 있는 디렉토리의 경로를 나타내는 Node.js의 전역 변수입니다. \
             * "parserOptions.resolvePluginsRelativeTo": __dirname - ESLint 플러그인을 찾을 디렉토리의 경로를 지정합니다. 이 설정은 플러그인이 루트 디렉토리의 node_modules에 설치되어 있지 않을 때 필요합니다.
             */
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
                extraFileExtensions: ['.json'],
                resolvePluginsRelativeTo: __dirname, // 중요
            },
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
                'plugin:perfectionist/recommended-natural',
            ],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            rules: {
                // react import 생략 가능하도록
                'react/react-in-jsx-scope': 'off',
                'react/prop-types': 'off',
                'react/no-unescaped-entities': 'off',
                'perfectionist/sort-objects': [
                    'error',
                    {
                        type: 'natural',
                        order: 'asc',
                    },
                ],
            },
        },
        {
            files: ['**/*.html', '**/*.json'],
            extends: ['plugin:perfectionist/recommended-line-length'],
            rules: {
                'perfectionist/sort-objects': [
                    'error',
                    {
                        type: 'line-length',
                        order: 'asc',
                    },
                ],
            },
        },
    ],
};
