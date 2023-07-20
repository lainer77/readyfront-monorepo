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

function Sidebar({ children }: { children: React.ReactNode }) {
    const [isShowing, setIsShowing] = useState(true);
    if (!isShowing)
        return (
            <div className="sidebar-disabled" onClick={() => setIsShowing((s) => !s)}>
                <VscChevronRight fontSize="2rem" />
            </div>
        );
    return (
        <section
            style={{
                padding: `1rem ${isShowing ? 1 : 0.5}rem`,
            }}
            className="sidebar"
        >
            {children}
            <div className="sidebar-botton ">
                <GithubLinkLogo />
                <GoogleLoginButton />
            </div>
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
        <a href="https://github.com/lainer77">
            <img alt="cv" height={30} src={githubUrl} width={30} />
        </a>
    );
}
