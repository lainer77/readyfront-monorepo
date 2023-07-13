import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';

const config: UserConfig = {
    build: {
        commonjsOptions: {
            include: [/@common\/components/, /node_modules/],
        },
    },
    optimizeDeps: {
        include: ['@common/components'],
    },
    plugins: [react(), ssr()],
    resolve: {
        alias: {
            components: '/renderer/components',
            resources: '/renderer/resources',
        },
    },
};

export default config;
