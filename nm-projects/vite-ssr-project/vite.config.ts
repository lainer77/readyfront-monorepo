import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';

const config: UserConfig = {
    plugins: [react(), ssr()],
    build: {
        rollupOptions: {
            external: [
                'react',
                'react-dom/client',
                'react/jsx-runtime',
                '@brillout/json-serializer/parse',
            ],
        },
    },
};

export default config;
