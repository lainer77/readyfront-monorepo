import esbuild from 'esbuild';

import config from './esbuild.config.cjs';

const run = async () => {
    try {
        await esbuild.build(config());
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

run();
