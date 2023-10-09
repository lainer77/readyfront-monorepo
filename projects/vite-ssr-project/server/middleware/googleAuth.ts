import { Application } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { getUsersTable, putUsersTable } from '../aws';

export function setupGoogleAuth(app: Application): void {
    const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
    const secretId = process.env.VITE_GOOGLE_SECRET_ID;
    if (!clientId || !secretId)
        throw new Error('Google clientID, clientSecret 키의 유무를 확인해주세요');

    passport.use(
        new GoogleStrategy(
            {
                callbackURL: '/auth/google/callback',
                clientID: clientId,
                clientSecret: secretId,
            },
            async (accessToken, refreshToken, profile, done) => {
                const { displayName, emails, id } = profile;
                const result = await getUsersTable(id);
                try {
                    if (!result)
                        await putUsersTable({
                            displayName,
                            email: emails ? emails[0].value : null, // 이메일이 있다면 첫 번째 이메일을 사용
                            id,
                            role: 'customer', // 사용권한 customer | owner
                        });
                    return done(null, profile);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.log(error);
                    return done(error);
                }
            },
        ),
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        }),
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        (req, res) => {
            res.redirect('/');
        },
    );
}
