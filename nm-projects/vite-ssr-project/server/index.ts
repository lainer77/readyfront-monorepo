// This file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562
//  - Consequently, the server needs be manually restarted when changing this file

import { app } from './app.js';

startServer();

function startServer() {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`Server running at http://localhost:${port}`);
}
