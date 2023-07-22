import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';

import type { PageContext } from '../../renderer/types';

import { PageContextProvider } from '../../renderer/usePageContext';
import { GlobalStyle } from '../GlobalStyle';
import { Link } from '../Link';
import { Profile } from '../Profile';
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
            <GlobalStyle />

            <GoogleOAuthProvider clientId={clientId}>
                <PageContextProvider pageContext={pageContext}>
                    <Layout>
                        <Sidebar>
                            <Logo />
                            <Profile />
                            <Link className="navitem" href="/">
                                Home
                            </Link>
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
