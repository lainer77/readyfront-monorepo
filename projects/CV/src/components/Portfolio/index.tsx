import React, { useEffect, useState } from 'react';

import './Portfolio.scss';

const datas = [
    { link: 'https://vsp.readyfront.co.kr/lab', title: '개인 개발 연구소' },
    { link: 'https://chatbot.readyfront.co.kr', title: '고양이 챗봇' },
    { link: 'https://interactive.readyfront.co.kr/bouncyBall/', title: '공 튀기기' },
    { link: 'https://interactive.readyfront.co.kr/mouseRect/', title: '박스 끈으로 끌어내기' },
    { link: 'https://interactive.readyfront.co.kr/shapeRotate/', title: '도형 회전' },
    { link: 'https://interactive.readyfront.co.kr/sheepHills/', title: '언덕을 오르는 양떼' },
    { link: 'https://interactive.readyfront.co.kr/maskClick/', title: '이미지 마스크 클릭 이벤트' },
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
                {datas.map((data, i) => (
                    <div className="project" key={i}>
                        <h3>{data.title}</h3>
                        <div className="content" onClick={() => window.open(data.link)}>
                            <iframe
                                height="100%"
                                sandbox={sandbox}
                                src={data.link}
                                style={{ pointerEvents: 'none' }}
                                title={i.toString()}
                                width="100%"
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
