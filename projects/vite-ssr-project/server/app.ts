// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562

import dotenv from 'dotenv';
import express from 'express';
import process from 'process';
import { renderPage } from 'vite-plugin-ssr/server';

import { setupMiddleware } from './middleware';
import { root } from './root';
import { setupApiRoutes } from './routes/apiRoutes';
import { getUserAgentInfo } from './utils';

dotenv.config(); // .env 파일을 로드하여 환경 변수 설정

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.disable('x-powered-by');

setupMiddleware(app);

if (isProduction) {
    app.use(express.static(`${root}/dist/client`));
} else {
    const vite = await import('vite');
    const viteDevMiddleware = (
        await vite.createServer({
            root,
            server: { middlewareMode: true },
        })
    ).middlewares;
    app.use(viteDevMiddleware);
}

// API 라우팅 설정
setupApiRoutes(app);

app.get('*', async (req, res, next) => {
    if (req.path.startsWith('/@api/')) return next();

    const userAgentInfo = getUserAgentInfo(req.headers['user-agent'] || '');
    const deviceType = userAgentInfo.getDevice().type || 'desktop';

    const pageContextInit = {
        deviceType,
        urlOriginal: req.originalUrl,
    };

    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();

    const { body, contentType, statusCode } = httpResponse;
    res.status(statusCode).type(contentType).send(body);
});

export { app };
