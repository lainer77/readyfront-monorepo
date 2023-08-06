import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일을 로드하여 환경 변수 설정

// AWS S3 인증 정보 설정
const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.VITE_AWS_S3_KEY || '',
        secretAccessKey: process.env.VITE_AWS_S3_SECRET_KEY || '',
    },
    region: 'ap-northeast-2',
});

// AWS CloudFront 객체 생성
const cloudFrontClient = new CloudFrontClient({});

// 업데이트할 파일 정보
const bucketName = process.env.VITE_CDN_BUCKET || '';

// 업데이트 함수 정의
export async function updateS3Object(fileName: string, dataToUpdate: string) {
    if (!bucketName) throw new Error('bucketName이 없습니다');
    const params = {
        Body: dataToUpdate,
        Bucket: bucketName,
        Key: fileName,
    };

    try {
        // S3에 파일 업로드
        const command = new PutObjectCommand(params);
        const res = await s3Client.send(command);

        // CloudFront 캐시 무효화 (Invalidate)
        const distributionId = process.env.VITE_CLOUDFRONT_DISTRIBUTION_ID;
        if (distributionId) {
            const paths = [`/${fileName}`]; // 캐시를 무효화할 파일 경로
            const cloudFrontParams = {
                DistributionId: distributionId,
                InvalidationBatch: {
                    CallerReference: `${Date.now()}`,
                    Paths: {
                        Items: paths,
                        Quantity: paths.length,
                    },
                },
            };
            const invalidateCommand = new CreateInvalidationCommand(cloudFrontParams);
            await cloudFrontClient.send(invalidateCommand);
        }

        return res;
    } catch (error) {
        console.error('Error updating data:', error);
    }
}
