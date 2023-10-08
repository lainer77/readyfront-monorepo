import axios from 'axios';
import express from 'express';
import { Readable } from 'stream';

import { updateS3Object } from '../aws/s3.js';

export const setupApiRoutes = (app: express.Application) => {
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
                        console.error(error);
                        // 원격 서버에서 에러가 발생하면 에러 메시지를 응답합니다.
                        res.status(error.response?.status || 500).send(
                            error.response?.data || error,
                        );
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
};
