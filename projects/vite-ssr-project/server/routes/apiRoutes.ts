import axios from 'axios';
import express from 'express';
import { Readable } from 'stream';

import { getUsersTable, updateS3Object } from '../aws';

// 로그인 및 권한 확인 미들웨어
const ensureAuthenticatedAndOwner = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    if (req.isAuthenticated()) {
        const result = await getUsersTable(req.user.id);
        if (result && result.role === 'owner') {
            return next();
        } else {
            res.status(401).send('권한이 없습니다');
        }
    } else {
        res.status(401).send('구글 로그인이 필요합니다');
    }
};
export const setupApiRoutes = (app: express.Application) => {
    app.all('/@api/*', async (req, res) => {
        if (req.path.startsWith('/@api/')) {
            const apiEndpoint = req.path;
            // 만약 /@api/cdn/* 요청이라면 cdn 서버로 요청 보내기
            if (apiEndpoint.startsWith('/@api/cdn/')) {
                const cdnEndpoint = apiEndpoint.replace('/@api/cdn/', '');

                const remoteUrl = `https://cdn.readyfront.co.kr/${cdnEndpoint}`;

                if (req.method === 'GET') {
                    try {
                        const response = await axios.get(remoteUrl, { responseType: 'stream' });

                        // 원격 서버의 응답을 클라이언트로 전송하기 위해 스트림을 사용함으로써 대용량 파일의 경우 메모리를 효율적으로 관리할 수 있습니다.
                        const stream = Readable.from(response.data);
                        res.setHeader('content-type', response.headers['content-type']);

                        stream.pipe(res);
                    } catch (error) {
                        res.status(404).send('Not Found');
                    }
                } else if (req.method === 'PUT') {
                    try {
                        ensureAuthenticatedAndOwner(req, res, async () => {
                            const dataToUpdate = req.body;

                            const response = await updateS3Object(cdnEndpoint, dataToUpdate.data);
                            if (response) res.status(200).send(response.data);
                        });

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } catch (error: any) {
                        console.error(error);
                        res.status(error.response?.status || 500).send(
                            error.response?.data || error,
                        );
                    }
                }

                return;
            } else {
                // 다른 @api/* 요청에 대한 처리 코드를 여기에 작성합니다.
            }

            res.status(404).send('Not Found');
        }
    });
};
