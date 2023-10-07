import { CSSProperties } from 'react';

function Header() {
    const headerStyle: CSSProperties = {
        backgroundColor: '#333',
        color: 'white',
        padding: '1em',
        position: 'sticky',
        textAlign: 'center',
        top: 0,
        width: '100%',
        zIndex: 2,
    };

    const navStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    };

    const navItemStyle: CSSProperties = {
        margin: '0 1em',
    };

    const linkStyle: CSSProperties = {
        color: 'white',
        textDecoration: 'none',
    };

    return (
        <header style={headerStyle}>
            {/* Navigation Links */}
            <nav>
                <ul style={navStyle}>
                    <li style={navItemStyle}>
                        <a href="#" style={linkStyle}>
                            자기소개
                        </a>
                    </li>
                    <li style={navItemStyle}>
                        <a href="#experience" style={linkStyle}>
                            경력
                        </a>
                    </li>
                    <li style={navItemStyle}>
                        <a href="#skills" style={linkStyle}>
                            기술 및 역량 요약
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
