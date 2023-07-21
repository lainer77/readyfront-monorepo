// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import process from 'process';
import UAParser from 'ua-parser-js';
import { renderPage } from 'vite-plugin-ssr/server';

import { root } from './root.js';

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.disable('x-powered-by');
app.use(cookieParser());
app.use(cors());

export function isValidCookie(cookieValue?: string) {
    // 쿠키 값이 문자열이 아니거나 비어있으면 올바르지 않음
    if (typeof cookieValue !== 'string' || cookieValue.trim() === '') {
        return false;
    }

    // 각 쿠키는 세미콜론으로 구분되므로 세미콜론을 기준으로 분리하여 배열로 만듦
    const cookies = cookieValue.split(';');

    // 각 쿠키가 올바른 형식인지 검사
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');

        // key=value 형태가 아니면 올바르지 않음
        if (!key || !value) {
            return false;
        }
    }

    // 모든 쿠키가 올바른 형식이면 true 반환
    return true;
}

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

app.get('*', async (req, res, next) => {
    // const cookieValue = req.headers.cookie;

    // // 쿠키 값이 적절한 형식인지 검사
    // if (!isValidCookie(cookieValue)) {
    //     return res.status(400).json({ error: 'Invalid cookie value' });
    // }
    res.cookie('cookieName', 'cookieValue', {
        httpOnly: true, // HTTP 통신만 가능하도록 설정
        // 쿠키 옵션 설정
        maxAge: 3600000, // 쿠키 유효 기간 (1시간)
        secure: true, // HTTPS 프로토콜에서만 전송되도록 설정
    });
    const userAgent = new UAParser(req.headers['user-agent']);

    const deviceType = userAgent.getDevice().type || 'desktop';
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
