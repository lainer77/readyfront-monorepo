import React, { useEffect, useState } from 'react';

import './Portfolio.scss';

const links = [
    'https://vsp.readyfront.co.kr/lab',
    'https://chatbot.readyfront.co.kr',
    // 'https://interactive.readyfront.co.kr/bouncyBall',
    // 'https://interactive.readyfront.co.kr/maskClick',
    // 'https://interactive.readyfront.co.kr/mouseRect',
    // 'https://interactive.readyfront.co.kr/shapeRotate',
    // 'https://interactive.readyfront.co.kr/sheepHills',
];

const Portfolio: React.FC = () => {
    const [sandbox, setSandbox] = useState<string | undefined>(undefined);
    useEffect(() => {
        setTimeout(() => {
            setSandbox('allow-same-origin');
        }, 3000);
    }, []);

    return (
        <section className="portfolio">
            <h1>포트폴리오</h1>
            <div>
                {links.map((link, i) => (
                    <div className="project" key={i} onClick={() => window.open(link)}>
                        <iframe
                            height="100%"
                            sandbox={sandbox}
                            src={link}
                            style={{ pointerEvents: 'none' }}
                            title={i.toString()}
                            width="100%"
                        ></iframe>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
