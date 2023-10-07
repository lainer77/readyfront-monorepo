// vite.config.ts
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    let alias;

    if (mode === 'development') {
        alias = {
            '#components': '/components',
            '#hooks': '/hooks',
            '#renderer': '/renderer',
            '@common/components': path.resolve(
                __dirname,
                '../../packages/common-components/lib/index.ts',
            ),
            '@common/utils': path.resolve(__dirname, '../../packages/common-utils/lib/index.ts'),
        };
    } else {
        alias = {
            '#components': '/components',
            '#hooks': '/hooks',
            '#renderer': '/renderer',
            // '@common/components', '@common/utils'를 여기서는 생략하므로
            // package.json의 dependencies에서 해결될 것입니다.
        };
    }

    return {
        optimizeDeps: {
            exclude: ['@common/components', '@common/utils'],
        },
        plugins: [react()],
        resolve: { alias },
    };
});
