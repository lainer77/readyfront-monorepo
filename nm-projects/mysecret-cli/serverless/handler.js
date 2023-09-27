import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME;

export const getSecret = async (event) => {
    const fileKey = event.queryStringParameters?.fileKey;
    const authorizer = event.requestContext.authorizer; // cli에서 로그인 후 인증 받은 cognito의 토큰

    if (!fileKey || !authorizer) {
        console.warn('Unauthorized request!');
        return {
            statusCode: 403,
            body: JSON.stringify({ message: 'Forbidden' }),
        };
    }

    const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Key: fileKey,
        Expires: 300,
    });

    if (signedUrl) {
        return {
            statusCode: 200,
            body: JSON.stringify({ url: signedUrl }),
        };
    } else {
        console.log('Request authorized. Returning secret.');
        return {
            statusCode: 200,
            body: JSON.stringify({ secret: 'Your Secret Here' }),
        };
    }
};
