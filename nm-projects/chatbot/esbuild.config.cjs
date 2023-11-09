const commonjs = require('@hyrious/esbuild-plugin-commonjs').commonjs;
const copyPlugin = require('esbuild-plugin-copy').default;

const config = () => ({
    bundle: true,
    entryPoints: ['express-app/server.js'],
    format: 'esm',
    // outfile: 'dist/server.js',
    outdir: 'dist',
    platform: 'node',
    plugins: [
        commonjs(),
        copyPlugin({
            assets: [
                {
                    from: ['./express-app/public/*.html'],
                    to: ['./public'],
                },
                {
                    from: ['./express-app/public/*.js'],
                    to: ['./public'],
                },
            ],
        }),
    ],
});

module.exports = config;
