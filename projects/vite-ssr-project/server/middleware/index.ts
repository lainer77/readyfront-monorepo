import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { setupGoogleAuth } from './googleAuth.js';
import { setupSession } from './sessionConfig.js';

export const setupMiddleware = (app: express.Application) => {
    app.use(cookieParser());
    app.use(cors());
    // JSON과 URL-encoded 형식의 요청 본문을 파싱.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    setupSession(app); // 세션
    setupGoogleAuth(app); // 구글 로그인
};
