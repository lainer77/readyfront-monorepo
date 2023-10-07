import React from 'react';

import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer" role="contentinfo">
            <div className="footer-content">
                <div className="brand-info">
                    <h4>Our Platforms</h4>
                    <ul>
                        <li>
                            <a
                                href="http://vsp.readyfront.co.kr"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                개발 연구소
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://chatbot.readyfront.co.kr"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                고양이 챗봇
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="social-info">
                    <h4>Follow Us</h4>
                    <a
                        aria-label="GitHub"
                        href="https://github.com/lainer77"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        GitHub
                    </a>
                </div>
                <div className="contact-info">
                    <h4>Contact</h4>
                    <address>
                        <p>
                            Email: <a href="mailto:zlepgk123@gmail.com">zlepgk123@gmail.com</a>
                        </p>
                    </address>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright © 2023 by 김대한</p>
            </div>
        </footer>
    );
};

export default Footer;
