// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562

import axios from 'axios';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import process from 'process';
import { Readable } from 'stream';
import UAParser from 'ua-parser-js';
import { renderPage } from 'vite-plugin-ssr/server';

import { updateS3Object } from './aws/s3.js';
import { root } from './root.js';

dotenv.config(); // .env 파일을 로드하여 환경 변수 설정

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.disable('x-powered-by');
app.use(cookieParser());
app.use(cors());

// JSON과 URL-encoded 형식의 요청 본문을 파싱합니다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    if (req.path.startsWith('/@api/')) return next();

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
app.all('/@api/*', async (req, res) => {
    if (req.path.startsWith('/@api/')) {
        // 여기서 @api/ 엔드포인트에 대한 GET 요청에 대한 핸들러를 처리합니다.
        // 예를 들어, GET 요청에 대한 처리를 추가하세요.
        const apiEndpoint = req.path;
        // 만약 /@api/cdn/* 요청이라면 cdn 서버로 요청 보내기
        if (apiEndpoint.startsWith('/@api/cdn/')) {
            const cdnEndpoint = apiEndpoint.replace('/@api/cdn/', '');

            // 원격 서버 URL을 구성합니다.
            const remoteUrl = `https://cdn.readyfront.co.kr/${cdnEndpoint}`;

            if (req.method === 'GET') {
                try {
                    // Axios를 사용하여 원격 서버에 GET 요청을 보냅니다.
                    const response = await axios.get(remoteUrl, { responseType: 'stream' });

                    // 원격 서버의 응답을 클라이언트로 전송하기 위해 스트림을 사용합니다.
                    // 이렇게 함으로써 대용량 파일의 경우 메모리를 효율적으로 관리할 수 있습니다.
                    const stream = Readable.from(response.data);
                    // 응답의 content-type을 설정합니다.
                    // 원격 서버에서 보낸 content-type을 그대로 전달합니다.
                    res.setHeader('content-type', response.headers['content-type']);

                    // 스트림을 클라이언트로 전송합니다.
                    stream.pipe(res);
                } catch (error) {
                    // 원격 서버에서 에러가 발생하면 404 Not Found를 응답합니다.
                    res.status(404).send('Not Found');
                }
            } else if (req.method === 'PUT') {
                try {
                    // PUT 요청으로 전송할 데이터를 받아옵니다. (이 예제에서는 간단히 body로 받아옴)
                    const dataToUpdate = req.body; // 이전 코드에서 req.body를 사용할 수 있도록 body-parser 등의 미들웨어를 추가해야 합니다.

                    // Axios를 사용하여 원격 서버에 PUT 요청을 보냅니다.
                    // const response = await axios.put(remoteUrl, dataToUpdate);
                    const response = await updateS3Object(cdnEndpoint, dataToUpdate.data);
                    if (response)
                        // 원격 서버의 응답을 클라이언트로 전송합니다.
                        res.status(200).send(response.data);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    // 원격 서버에서 에러가 발생하면 에러 메시지를 응답합니다.
                    res.status(error.response?.status || 500).send(error.response?.data || 'Error');
                }
            }

            return;
        } else {
            // 다른 @api/* 요청에 대한 처리 코드를 여기에 작성합니다.
            // 예를 들어, 다른 API 엔드포인트에 대한 로직을 추가할 수 있습니다.
        }

        // 만약 지원하지 않는 엔드포인트라면 404 Not Found를 응답합니다.
        res.status(404).send('Not Found');
    }
});
export { app };
