import { Application } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

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
            (accessToken, refreshToken, profile, done) => {
                return done(null, profile);
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
