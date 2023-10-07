import { CSSProperties, useState } from 'react';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const sidebarStyle: CSSProperties = {
        backgroundColor: '#333',
        color: 'white',
        height: '100%',
        left: 0,
        maxWidth: '200px',
        overflowY: 'auto',
        padding: '1em',
        position: 'fixed',
        top: 0,
        zIndex: 2,
    };

    const navStyle: CSSProperties = {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    };

    const navItemStyle: CSSProperties = {
        margin: '0.5em 0',
    };

    const linkStyle: CSSProperties = {
        color: 'white',
        textDecoration: 'none',
    };

    const dropdownStyle: CSSProperties = {
        display: isOpen ? 'block' : 'none',
    };

    return (
        <section style={sidebarStyle}>
            {/* Navigation Links */}
            <nav>
                <ul style={navStyle}>
                    <li onClick={() => setIsOpen(!isOpen)} style={navItemStyle}>
                        메뉴
                        <ul style={{ ...navItemStyle, ...dropdownStyle }}>
                            <li>
                                <a href="#about-me" style={linkStyle}>
                                    자기소개
                                </a>
                            </li>
                            <li>
                                <a href="#experience" style={linkStyle}>
                                    경력
                                </a>
                            </li>
                            <li>
                                <a href="#portfolio" style={linkStyle}>
                                    포트폴리오
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </section>
    );
}

export default Sidebar;
