import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            // 적절한 확장자가 추가됩니다.
            fileName: 'my-lib',
            name: 'MyLib',
        },
        rollupOptions: {
            external: ['react', 'react-dom'], // 외부 종속성으로 설정
            output: {
                format: 'esm', // SSR과 호환되는 ESM 형식으로 출력
                globals: {
                    react: 'React', // 전역 변수에 연결할 이름을 설정 (ex: 'React'는 window.React에 매핑됨)
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'production',
    },
    plugins: [react()],
});
