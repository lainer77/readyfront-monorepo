import react from '@vitejs/plugin-react';
import sass from 'sass';
import { UserConfig, loadEnv } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';
import windiCSS from 'vite-plugin-windicss';

const isProduction = process.env.NODE_ENV === 'production';
// loadEnv 함수를 사용하여 .env 파일에 정의된 환경 변수들을 불러옴
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd());

const config: UserConfig = {
    build: {
        commonjsOptions: {
            include: [/@common\/components/, /node_modules/],
        },
        // 조건부 설정 예시: production 환경에서만 minify를 활성화
        minify: isProduction,
    },
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
    // 환경 변수 설정 예시
    define: {
        'process.env': env,
    },
    optimizeDeps: {
        include: ['@common/components', 'shallowequal'],
    },
    plugins: [react(), ssr(), windiCSS()],
    resolve: {
        alias: {
            '#components': '/components',
            '#hooks': '/hooks',
            '#renderer': '/renderer',
        },
    },
    ssr: {
        // 사실 추가 안해도 차이는 없으나 혹시 모르니 추가
        noExternal: [
            'normalize.css',
            'aws-sdk',
            'express',
            'serverless-http',
            'dotenv',
            'body-parser',
            'cookie-parser',
        ],
    },
};

export default config;
