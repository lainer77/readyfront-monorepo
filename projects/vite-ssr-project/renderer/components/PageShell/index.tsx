import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import type { PageContext } from '../../types';

import cvUrl from '../../resources/svg/CV.svg';
import githubUrl from '../../resources/svg/github.svg';
import { PageContextProvider } from '../../usePageContext';
import { GlobalStyle } from '../GlobalStyle';
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
                            <GithubLinkLogo />
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
            }}
        >
            {children}
        </div>
    );
}

function Sidebar({ children }: { children: React.ReactNode }) {
    const [isShowing, setIsShowing] = useState(true);
    if (!isShowing)
        return (
            <div
                style={{
                    alignSelf: 'flex-end',
                    bottom: '1rem',
                    left: '1rem',
                    position: 'fixed',
                    zIndex: 1,
                }}
                onClick={() => setIsShowing((s) => !s)}
            >
                <VscChevronRight fontSize="2rem" />
            </div>
        );
    return (
        <section
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                lineHeight: '1.8em',
                padding: `1rem ${isShowing ? 1 : 0.5}rem`,
            }}
        >
            {children}
            <div onClick={() => setIsShowing((s) => !s)} style={{ alignSelf: 'flex-end' }}>
                <VscChevronLeft fontSize="2rem" />
            </div>
        </section>
    );
}

function Content({ children }: { children: React.ReactNode }) {
    const [title, setTitle] = useState('');
    useEffect(() => {
        if (typeof document !== 'undefined') setTitle(document.title);
    }, []);

    return (
        <section
            style={{
                borderLeft: '2px solid #eee',
                minHeight: '100vh',
                overflow: 'scroll',
                width: '100%',
            }}
        >
            <header
                style={{
                    alignItems: 'center',
                    background: '#fff',
                    borderBottom: '0.2rem solid #eee',
                    display: 'flex',
                    height: '5rem',
                    justifyContent: 'space-between',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                }}
            >
                <h1>{title}</h1>
                <GoogleLoginButton />
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
    return (
        <div
            style={{
                marginBottom: 10,
            }}
        >
            <img alt="cv" height={40} src={cvUrl} width={60} />
        </div>
    );
}

function GithubLinkLogo() {
    return (
        <a
            style={{
                marginTop: 'auto',
            }}
            href="https://github.com/lainer77"
        >
            <img alt="cv" height={30} src={githubUrl} width={30} />
        </a>
    );
}
