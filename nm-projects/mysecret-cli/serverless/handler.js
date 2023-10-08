import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const SECRET_PASSWORD = process.env.SECRET_PASSWORD;
const BUCKET_NAME = process.env.BUCKET_NAME;

export const getSecret = async (event) => {
    const fileKey = event.queryStringParameters?.fileKey;
    const passwordFromHeader = event.headers.password;

    if (!fileKey || passwordFromHeader !== SECRET_PASSWORD) {
        console.warn('Unauthorized request!');
        return {
            body: JSON.stringify({ message: 'Forbidden' }),
            statusCode: 403,
        };
    }

    const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Expires: 300,
        Key: fileKey,
    });

    if (signedUrl) {
        return {
            body: JSON.stringify({ url: signedUrl }),
            statusCode: 200,
        };
    } else {
        console.log('Request authorized. Returning secret.');
        return {
            body: JSON.stringify({ secret: 'Your Secret Here' }),
            statusCode: 200,
        };
    }
};
