import Switch from '#components/Switch';
import { useThemeContext } from '#hooks/useThemeContext';
import { useState } from 'react';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import GoogleLoginButton from '../GoogleLoginButton';

function GithubLinkLogo() {
    return (
        <a href="https://github.com/lainer77">
            <img alt="cv" height={30} src="/svg/github.svg" width={30} />
        </a>
    );
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [isShowing, setIsShowing] = useState(true);
    const { theme, toggleTheme } = useThemeContext();

    if (!isShowing)
        return (
            <div className="sidebar-disabled" onClick={() => setIsShowing((s) => !s)}>
                <VscChevronRight fontSize="2rem" />
            </div>
        );
    return (
        <section className="sidebar">
            {children}
            <div className="sidebar-botton ">
                <GithubLinkLogo />
                <GoogleLoginButton />
                <Switch onChange={() => toggleTheme()} value={theme === 'dark'} />
            </div>
            <div
                className="sidebar-abled"
                onClick={() => setIsShowing((s) => !s)}
                style={{ alignSelf: 'flex-end' }}
            >
                <VscChevronLeft fontSize="2rem" />
            </div>
        </section>
    );
}
