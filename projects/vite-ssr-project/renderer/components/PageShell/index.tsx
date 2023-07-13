import React from 'react';

import type { PageContext } from '../../types';

import { PageContextProvider } from '../../usePageContext';
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
    return (
        <React.StrictMode>
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
            <Profile />
        </div>
    );
}
