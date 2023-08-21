import { GlobalStyle } from '#components/GlobalStyle';
import { Link } from '#components/Link';
import { Profile } from '#components/Profile';
import { PageContextProvider } from '#hooks/usePageContext';
import { ThemeProvider } from '#hooks/useThemeContext';
import { PageContext } from '#renderer/types';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';

import './PageShell.scss';
import Sidebar from './Sidebar';

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
            <ThemeProvider>
                <GlobalStyle />

                <GoogleOAuthProvider clientId={clientId}>
                    <PageContextProvider pageContext={pageContext}>
                        <Layout>
                            <Sidebar>
                                <Logo />
                                <Profile />
                                {/* <Link className="navitem" href="/">
                                Home
                            </Link> */}
                                {/* <Link className="navitem" href="/my">
                                My
                            </Link> */}
                                <Link className="navitem" href="/lab">
                                    Lab
                                </Link>
                                <Link className="navitem" href="/issue">
                                    Issue
                                </Link>
                            </Sidebar>
                            <Content>{children}</Content>
                        </Layout>
                    </PageContextProvider>
                </GoogleOAuthProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
}

function Layout({ children }: { children: React.ReactNode }) {
    return <div className="layout-container">{children}</div>;
}

function Content({ children }: { children: React.ReactNode }) {
    const [title, setTitle] = useState('');
    useEffect(() => {
        if (typeof document !== 'undefined') setTitle(document.title);
    }, []);

    return (
        <section className="content-container">
            <header>
                <h1>{title}</h1>
            </header>
            <section
                style={{
                    padding: 20,
                    paddingBottom: 50,
                }}
            >
                {children}
            </section>
        </section>
    );
}

function Logo() {
    return <img alt="cv" height={40} src="/svg/CV.svg" width={60} />;
}
