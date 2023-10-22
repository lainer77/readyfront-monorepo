import React, { useEffect, useState } from 'react';

import './Portfolio.scss';

const datas = [
    {
        github: 'https://github.com/lainer77/readyfront-monorepo/tree/master/projects/vite-ssr-project',
        site: 'https://vsp.readyfront.co.kr/lab',
        title: '개인 개발 연구소',
    },
    {
        github: 'https://github.com/lainer77/readyfront-monorepo/tree/master/nm-projects/chatbot',
        site: 'https://chatbot.readyfront.co.kr',
        title: '고양이 챗봇',
    },
    {
        github: 'https://github.com/lainer77/readyfront-monorepo/tree/master/projects/interactive-study/mouseRect',
        site: 'https://interactive.readyfront.co.kr/mouseRect/',
        title: '박스 끈으로 끌어내기',
    },
    {
        github: 'https://github.com/lainer77/readyfront-monorepo/tree/master/projects/interactive-study/shapeRotate',
        site: 'https://interactive.readyfront.co.kr/shapeRotate/',
        title: '도형 회전',
    },
    {
        github: 'https://github.com/lainer77/readyfront-monorepo/tree/master/projects/interactive-study/sheepHills',
        site: 'https://interactive.readyfront.co.kr/sheepHills/',
        title: '언덕을 오르는 양떼',
    },
    {
        github: 'https://github.com/lainer77/readyfront-monorepo/tree/master/projects/interactive-study/maskClick',
        site: 'https://interactive.readyfront.co.kr/maskClick/',
        title: '이미지 마스크 클릭 이벤트',
    },
];

const Portfolio: React.FC = () => {
    const [sandbox, setSandbox] = useState<string | undefined>(undefined);
    useEffect(() => {
        setTimeout(() => {
            setSandbox('allow-same-origin');
        }, 3000);
    }, []);

    return (
        <section aria-label="Portfolio Section" className="portfolio">
            <h1 tabIndex={0}>포트폴리오</h1>
            <div role="list">
                {datas.map((data, i) => (
                    <div className="project" key={i} role="listitem">
                        <h3 tabIndex={0}>{data.title}</h3>
                        <div className="content" role="group" tabIndex={0}>
                            <iframe
                                aria-hidden="true"
                                height="100%"
                                sandbox={sandbox}
                                src={data.site}
                                style={{ pointerEvents: 'none' }}
                                title={`${data.title} preview`}
                                width="100%"
                            ></iframe>
                            <div aria-label="Overlay Options" className="contentOver">
                                {data.github && (
                                    <div
                                        aria-label={`View source code of ${data.title}`}
                                        className="contentTop clickable"
                                        onClick={() => window.open(data.github)}
                                        role="link"
                                        tabIndex={0}
                                    >
                                        소스보기
                                    </div>
                                )}
                                <div
                                    aria-label={`Visit website of ${data.title}`}
                                    className="contentBottom clickable"
                                    onClick={() => window.open(data.site)}
                                    role="link"
                                    tabIndex={0}
                                >
                                    사이트방문
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
