import { GlobalStyle } from '#components/GlobalStyle';
import { Link } from '#components/Link';
import { Profile } from '#components/Profile';
import { PageContextProvider } from '#hooks/usePageContext';
import { ThemeProvider } from '#hooks/useThemeContext';
import { PageContext } from '#renderer/types';
import React, { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';

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
    return (
        <React.StrictMode>
            <ThemeProvider>
                <RecoilRoot>
                    <GlobalStyle />

                    <PageContextProvider pageContext={pageContext}>
                        <Layout>
                            <Sidebar>
                                <Logo />
                                <Profile />
                                <Link className="navitem clickable" href="/lab">
                                    Lab
                                </Link>
                                <Link className="navitem clickable" href="/issue">
                                    Issue
                                </Link>
                                <Link className="navitem clickable" href="/setting">
                                    Setting
                                </Link>
                            </Sidebar>
                            <Content>{children}</Content>
                        </Layout>
                    </PageContextProvider>
                </RecoilRoot>
            </ThemeProvider>
        </React.StrictMode>
    );
}

function Layout({ children }: PropsWithChildren) {
    return <div className="layout-container">{children}</div>;
}

function Content({ children }: PropsWithChildren) {
    // const [title, setTitle] = useState('');
    // useEffect(() => {
    //     if (typeof document !== 'undefined') setTitle(document.title);
    // }, []);

    return (
        <section className="content-container">
            {/* {title && (
                <header>
                    <h1>{title}</h1>
                </header>
            )} */}
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
    return <img alt="rf" height={40} src="/svg/RF.svg" width={60} />;
}
