const commonjs = require('@hyrious/esbuild-plugin-commonjs').commonjs;
const copyPlugin = require('esbuild-plugin-copy').default;

module.exports = () => ({
    bundle: true,
    entryPoints: ['express-app/server.js'],
    format: 'esm',
    outfile: 'dist/server.js',
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
