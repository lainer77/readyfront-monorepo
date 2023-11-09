import serverless from 'serverless-http';

import { app } from './app';

export const handler = (event: { 'detail-type': string }, context: object) => {
    if (event['detail-type'] === 'Scheduled Event')
        return { headers: { 'Content-Type': 'application/json' }, statusCode: 200 };
    return serverless(app)(event, context);
};
