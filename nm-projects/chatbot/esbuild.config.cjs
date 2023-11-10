const commonjs = require('@hyrious/esbuild-plugin-commonjs').commonjs;
const copyPlugin = require('esbuild-plugin-copy').default;
const nodeExternalsPlugin = require('esbuild-plugin-node-externals').default;

const config = () => {
    const envDefines = Object.entries(process.env).reduce((acc, [key, value]) => {
        acc[`process.env.${key}`] = JSON.stringify(value);
        return acc;
    }, {});
    envDefines['process.env.ALLOWED_HOST'] = JSON.stringify('chatbot.readyfront.co.kr');

    return {
        bundle: true,
        entryPoints: ['express-app/server.js'],
        format: 'esm',
        // outfile: 'dist/server.js',
        outdir: 'dist',
        platform: 'node',
        define: envDefines,
        nodePaths: ['express-app/node_modules'],
        plugins: [
            commonjs(),
            nodeExternalsPlugin({
                // 'body-parser'를 여기에 추가할 수 있습니다.
                // allowList: ['body-parser'],
                externals: ['aws-sdk'],
            }),
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
    };
};

module.exports = config;
