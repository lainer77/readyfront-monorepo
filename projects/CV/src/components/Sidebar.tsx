import { useEffect, useRef, useState } from 'react';
import { FaBriefcase, FaHome, FaWrench } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

import './Sidebar.scss';

function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = (state: boolean) => {
        setIsOpen(state);
        document.body.style.overflow = state ? 'hidden' : 'auto';
    };

    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                toggleSidebar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {isOpen && <div className="overlay" onClick={() => toggleSidebar(false)} />}
            {!isOpen && <FiMenu className="menuIcon" onClick={() => toggleSidebar(!isOpen)} />}
            <div className={`sidebar ${isOpen ? 'isOpen' : 'isClosed'}`} ref={sidebarRef}>
                <nav>
                    <ul>
                        <li>
                            {isOpen && (
                                <ul>
                                    {Object.entries({
                                        '#': ['자기소개', <FaHome key="home" />],
                                        '#experience': ['경력', <FaBriefcase key="briefcase" />],
                                        '#skills': ['기술 및 역량 요약', <FaWrench key="wrench" />],
                                    }).map(([key, [value, icon]]) => (
                                        <li key={key}>
                                            <a href={key} onClick={() => toggleSidebar(false)}>
                                                {icon} {value}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Sidebar;
