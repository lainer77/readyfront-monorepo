import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

import type { PageContext } from '../../types';

import { PageContextProvider } from '../../usePageContext';
import GoogleLoginButton from '../GoogleLoginButton';
import { Link } from '../Link';
import { Profile } from '../Profile';
import './PageShell.css';

export { PageShell };

function PageShell({
    children,
    pageContext,
}: {
    children: React.ReactNode;
    pageContext: PageContext;
}) {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return (
        <React.StrictMode>
            <GoogleOAuthProvider clientId={clientId}>
                <PageContextProvider pageContext={pageContext}>
                    <Layout>
                        <Sidebar>
                            <Logo />
                            <Link className="navitem" href="/my">
                                My
                            </Link>
                            <Link className="navitem" href="/lab">
                                Lab
                            </Link>
                        </Sidebar>
                        <Content>{children}</Content>
                    </Layout>
                </PageContextProvider>
            </GoogleOAuthProvider>
        </React.StrictMode>
    );
}

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                display: 'flex',
                margin: 'auto',
                maxWidth: 900,
            }}
        >
            {children}
        </div>
    );
}

function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                lineHeight: '1.8em',
                padding: 20,
            }}
        >
            {children}
        </div>
    );
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <>
            <section
                style={{
                    borderLeft: '2px solid #eee',
                    minHeight: '100vh',
                    width: '100%',
                }}
            >
                <header
                    style={{
                        alignItems: 'center',
                        borderBottom: '0.2rem solid #eee',
                        display: 'flex',
                        height: '5rem',
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                        position: 'sticky',
                        top: 0,
                        width: '100%',
                    }}
                >
                    <GoogleLoginButton />
                </header>
                <div
                    style={{
                        padding: 20,
                        paddingBottom: 50,
                    }}
                >
                    {children}
                </div>
            </section>
        </>
    );
}

function Logo() {
    return (
        <div
            style={{
                marginBottom: 10,
                marginTop: 20,
            }}
        >
            <Profile />
        </div>
    );
}
