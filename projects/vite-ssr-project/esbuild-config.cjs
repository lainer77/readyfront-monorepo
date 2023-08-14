const esbuildPlugins = require('./esbuild-plugins.cjs');

const dotenv = require('dotenv');

// .env.production 파일 로드
dotenv.config({ path: '.env.production' });

module.exports = () => {
    // 환경 변수를 문자열로 변환
    const envDefines = Object.entries(process.env).reduce((acc, [key, value]) => {
        acc[`process.env.${key}`] = JSON.stringify(value);
        return acc;
    }, {});

    return {
        packager: 'pnpm',
        platform: 'node',
        format: 'esm',
        outputFileExtension: '.mjs', // https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html
        bundle: true,
        sourcemap: true,
        // https://github.com/evanw/esbuild/issues/1921
        banner: {
            js: `
                import { createRequire as topLevelCreateRequire } from 'module';
                const require = topLevelCreateRequire(import.meta.url);
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
            `,
        },
        define: envDefines,
        plugins: esbuildPlugins,
    };
};
