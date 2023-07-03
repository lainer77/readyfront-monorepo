import React from 'react';

import type { PageContext } from './types';

import { Link } from './Link';
import './PageShell.css';
import logo from './logo.svg';
import { PageContextProvider } from './usePageContext';

export { PageShell };

function PageShell({
    children,
    pageContext,
}: {
    children: React.ReactNode;
    pageContext: PageContext;
}) {
    return (
        <React.StrictMode>
            <PageContextProvider pageContext={pageContext}>
                <Layout>
                    <Sidebar>
                        <Logo />
                        <Link className="navitem" href="/">
                            Home
                        </Link>
                        <Link className="navitem" href="/about">
                            About
                        </Link>
                    </Sidebar>
                    <Content>{children}</Content>
                </Layout>
            </PageContextProvider>
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
        <div
            style={{
                borderLeft: '2px solid #eee',
                minHeight: '100vh',
                padding: 20,
                paddingBottom: 50,
            }}
        >
            {children}
        </div>
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
            <a href="/">
                <img alt="logo" height={64} src={logo} width={64} />
            </a>
        </div>
    );
}
