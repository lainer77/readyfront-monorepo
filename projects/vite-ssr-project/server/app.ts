// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562

import dotenv from 'dotenv';
import express from 'express';
import process from 'process';
import { renderPage } from 'vite-plugin-ssr/server';

import { setupMiddleware } from './middleware/index.js';
import { root } from './root.js';
import { setupApiRoutes } from './routes/apiRoutes.js';
import { getUserAgentInfo } from './utils/index.js';

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

    res.cookie('cookieName', 'cookieValue', {
        httpOnly: true, // HTTP 통신만 가능하도록 설정
        // 쿠키 옵션 설정
        maxAge: 3600000, // 쿠키 유효 기간 (1시간)
        secure: true, // HTTPS 프로토콜에서만 전송되도록 설정
    });

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
