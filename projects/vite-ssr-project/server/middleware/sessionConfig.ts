import dotenv from 'dotenv';
import { Application } from 'express';
import session from 'express-session';

dotenv.config();

export function setupSession(app: Application): void {
    const secretKey = process.env.VITE_SESSTION_SECRET_KEY;

    if (!secretKey) throw new Error('secretKey 값이 누락되었습니다.');
    app.use(
        session({
            resave: false,
            saveUninitialized: false,
            secret: secretKey,
        }),
    );
}
