import react from '@vitejs/plugin-react';
import sass from 'sass';
import { UserConfig } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';

const config: UserConfig = {
    build: {
        commonjsOptions: {
            include: [/@common\/components/, /node_modules/],
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
    optimizeDeps: {
        include: ['@common/components', 'shallowequal'],
    },
    plugins: [react(), ssr()],
    resolve: {
        alias: {
            components: '/renderer/components',
            hooks: '/renderer/hooks',
            resources: '/renderer/resources',
        },
    },
    ssr: {
        noExternal: ['styled-components'],
        optimizeDeps: {
            include: ['styled-components'],
        },
    },
};

export default config;
