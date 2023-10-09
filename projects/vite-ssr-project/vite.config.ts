import react from '@vitejs/plugin-react';
import path from 'path';
import sass from 'sass';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';
import windiCSS from 'vite-plugin-windicss';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd());
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig(({ mode }: ConfigEnv) => {
    const baseAlias = {
        '#atoms': '/atoms',
        '#components': '/components',
        '#hooks': '/hooks',
        '#renderer': '/renderer',
    };

    const devAlias = {
        '@common/components': path.resolve(
            __dirname,
            '../../packages/common-components/lib/index.ts',
        ),
        // '@common/utils': path.resolve(__dirname, '../../packages/common-utils/lib/index.ts'),
    };

    const alias = mode === 'development' ? { ...baseAlias, ...devAlias } : baseAlias;

    return {
        build: {
            commonjsOptions: {
                include: [/node_modules/],
            },
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
            exclude: [
                'aws-sdk',
                '@common/components',
                // '@common/utils'
            ],
            include: ['@babel/runtime', 'shallowequal'],
        },
        plugins: [react(), ssr(), windiCSS()],
        resolve: { alias },
    };
});
