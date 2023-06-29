import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            name: 'MyLib',
            // 적절한 확장자가 추가됩니다.
            fileName: 'my-lib',
        },
    },
});
