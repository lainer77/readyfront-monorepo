import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일을 로드하여 환경 변수 설정
// AWS S3 인증 정보 설정
AWS.config.update({
    accessKeyId: process.env.VITE_AWS_S3_KEY,
    region: 'ap-northeast-2',
    secretAccessKey: process.env.VITE_AWS_S3_SECRET_KEY,
});

// AWS S3 객체 생성
const s3 = new AWS.S3();
// AWS CloudFront 객체 생성
const cloudFront = new AWS.CloudFront();

// 업데이트할 파일 정보
const bucketName = process.env.VITE_CDN_BUCKET || '';
// 업데이트 함수 정의
export async function updateS3Object(fileName: string, dataToUpdate: string) {
    if (!bucketName) throw new Error('bucketName이 없습니다');
    const params: AWS.S3.PutObjectRequest = {
        Body: dataToUpdate,
        Bucket: bucketName,
        Key: fileName,
    };

    try {
        // S3에 파일 업로드
        const res = await s3.putObject(params).promise();
        // CloudFront 캐시 무효화 (Invalidate)
        const distributionId = process.env.VITE_CLOUDFRONT_DISTRIBUTION_ID;
        if (distributionId) {
            const paths = [`/${fileName}`]; // 캐시를 무효화할 파일 경로
            const cloudFrontParams: AWS.CloudFront.CreateInvalidationRequest = {
                DistributionId: distributionId,
                InvalidationBatch: {
                    CallerReference: `${Date.now()}`,
                    Paths: {
                        Items: paths,
                        Quantity: paths.length,
                    },
                },
            };
            await cloudFront.createInvalidation(cloudFrontParams).promise();
        }

        return res.$response;
    } catch (error) {
        console.error('Error updating data:', error);
    }
}
