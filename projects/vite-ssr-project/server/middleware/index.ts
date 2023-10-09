import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { setupGoogleAuth } from './googleAuth';
import { setupSession } from './sessionConfig';

export const setupMiddleware = (app: express.Application) => {
    app.use(cookieParser());
    app.use(
        cors({
            credentials: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            optionsSuccessStatus: 204,
            origin: '*',
        }),
    );
    // JSON과 URL-encoded 형식의 요청 본문을 파싱.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    setupSession(app); // 세션 -> 람다라서 세션이 유지도지 않음
    setupGoogleAuth(app); // 구글 로그인
};
