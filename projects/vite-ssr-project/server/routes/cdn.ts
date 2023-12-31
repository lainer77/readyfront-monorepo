import express from 'express';
export { cdnRoute };
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Readable } from 'stream';

import { getUsersTable, updateS3Object } from '../aws';

const ensureAuthenticatedAndOwner = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        try {
            const decoded: any = jwt.verify(token, process.env.VITE_JWT_SECRET_KEY as string);
            const result = await getUsersTable(decoded.id);

            if (result && result.role === 'owner') {
                req.user = decoded;
                return next();
            } else {
                res.status(401).send('권한이 없습니다');
            }
        } catch (error) {
            res.status(402).send('잘못된 토큰입니다');
        }
    } else {
        res.status(401).send('구글 로그인이 필요합니다');
    }
};
const cdnRoute = async (req: express.Request, res: express.Response) => {
    const apiEndpoint = req.path;
    const cdnEndpoint = apiEndpoint.replace('/api/cdn/', '');

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
            res.status(error.response?.status || 500).send(error.response?.data || error);
        }
    }
};
