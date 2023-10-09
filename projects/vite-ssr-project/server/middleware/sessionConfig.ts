import dotenv from 'dotenv';
import { Application } from 'express';
import session from 'express-session';

dotenv.config();

export function setupSession(app: Application): void {
    const secretKey = process.env.VITE_SESSTION_SECRET_KEY;
    console.log('secretKey', secretKey);
    if (!secretKey) throw new Error('secretKey 값이 누락되었습니다.');
    app.use(
        session({
            cookie: {
                httpOnly: true,
                maxAge: 604800000, // 일주일
                secure: process.env.NODE_ENV === 'production',
            },
            resave: false,
            saveUninitialized: false,
            secret: secretKey, // 여기에 암호화 키를 입력하세요
        }),
    );
}
