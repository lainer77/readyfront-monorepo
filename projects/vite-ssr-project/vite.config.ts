import react from '@vitejs/plugin-react';
import sass from 'sass';
import { UserConfig, loadEnv } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';
import windiCSS from 'vite-plugin-windicss';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd());
const isProduction = process.env.NODE_ENV === 'production';

const config: UserConfig = {
    build: {
        commonjsOptions: {
            include: [/node_modules/],
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
    define: {
        'import.meta.env.VITE_HOST': JSON.stringify(env.VITE_HOST),
        'process.env': env,
    },
    optimizeDeps: {
        exclude: ['aws-sdk'],
        include: ['shallowequal'],
    },
    plugins: [react(), ssr(), windiCSS()],
    resolve: {
        alias: {
            '#components': '/components',
            '#hooks': '/hooks',
            '#renderer': '/renderer',
        },
    },
};

export default config;
