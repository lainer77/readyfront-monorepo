import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const SECRET_PASSWORD = process.env.SECRET_PASSWORD;
const BUCKET_NAME = process.env.BUCKET_NAME;

export const getSecret = async (event) => {
    const body = JSON.parse(event.body);
    const fileKey = event.queryStringParameters?.fileKey;

    if (!fileKey || !event.requestContext.authorizer || body.password !== SECRET_PASSWORD) {
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
