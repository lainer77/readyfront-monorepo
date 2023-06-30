import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            // 적절한 확장자가 추가됩니다.
            fileName: 'my-lib',
            name: 'MyLib',
        },
    },
    plugins: [react()],
});
