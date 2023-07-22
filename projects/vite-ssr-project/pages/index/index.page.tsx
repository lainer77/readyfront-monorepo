import RenderMark from '~components/RenderMark';
import { StaticComponentEdit } from '~components/StaticComponentEdit';

import './home.scss';
export function Page() {
    return (
        <section>
            <RenderMark type="SSR" />
            <StaticComponentEdit>
                <article className="cv-content">
                    <h2>
                        안녕하세요.
                        <br />
                        좋은 사용자 경험을 고민하는
                        <br />
                        프론트 개발자 김대한입니다.
                    </h2>
                    <ul>
                        <li>UI, UX에 대해 이야기하고 개선하는 과정을 좋아합니다.</li>
                        <li>기록하고 돌아보고 개선하는 과정을 좋아합니다.</li>
                        <li>도전적이고 투명하며 화기애애한 조직을 좋아합니다.</li>
                        <li>
                            구성원들이 조직의 비전을 함께 구체화하고 공감할 수 있는 조직을
                            좋아합니다.
                        </li>
                    </ul>
                    <hr />
                    <h3>기술 및 역량 요약</h3>
                    <ul>
                        <li>
                            Node.js의 Module System인 CJS/ESM을 이해하고, 두 Module System 모두에
                            호환 가능한 라이브러리 운영에 관심이 있습니다.
                        </li>
                        <li>
                            웹뷰 환경의 모바일 웹 제품 개발 경험이 있고 User-Agent 파싱, 앱브릿지
                            통신, meta 태그 파싱 등 네이티브와 웹이 상호작용하는 패턴에 익숙합니다.
                        </li>
                        <li>
                            크거나 작은 규모의 웹 프로그램을 설계할 수 있습니다.
                            <p className="description">
                                모바일 웹앱, PC, 어드민 등 다양한 프로젝트를 리딩하고 개발한 경험이
                                있습니다.
                            </p>
                        </li>
                        <h4>HTML/CSS</h4>
                        <ul>
                            <li>
                                Semantic Markup을 중요하게 여기며, HTML를 작성할 때 의미를
                                부여합니다.
                                <br />
                                <p className="description">
                                    HTML이 길어질 수록 Semantic Markup이 중요해지기 때문에 초기에
                                    작성할 때 부터 고려하는 편입니다.
                                </p>
                            </li>
                            <li>
                                CSS를 짤 때 최대한 간단하고, 개발자 친화적으로 짤 수 있게
                                노력합니다.
                                <br />
                                <p className="description">
                                    CSS를 개발할 때 tag들을 각 요소별로 구분하여 쉽게 알아볼 수
                                    있도록 코딩합니다.
                                </p>
                            </li>
                            <li>
                                SASS(SCSS)와 같은 CSS Preprocessor를 사용할 수 있습니다.
                                <br />
                                <p className="description">CSS Module과 SCSS 조합을 선호합니다.</p>
                                <p className="description">
                                    Emotion 및 Styled Component를 활용한 프로젝트를 설계 할 수 있고,
                                    구현이 가능합니다.
                                </p>
                            </li>
                            <li>
                                여러 브라우저를 지원할 수 있습니다. <br />
                                <p className="description">
                                    Chrome, Safari, Firefox등 여러 브라우저들을 지원하는 앱을 만들
                                    수 있습니다.
                                </p>
                            </li>
                            <li>
                                favicon, Open Graph protocol, SEO 등의 적용 경험이 있습니다.
                                <br />
                                <p className="description">
                                    네이버, 구글등 Robot.txt를 통해 검색되도록 지원해본 경험이
                                    있습니다.
                                </p>
                            </li>
                        </ul>

                        <h4>TypeScript</h4>
                        <ul>
                            <li>
                                TypeScript를 이용한 React 코딩에 익숙합니다.
                                <p className="description">
                                    다양한 프로젝트 경험으로 코드 리딩 및 작성이 가능합니다.
                                </p>
                            </li>
                            <li>
                                문법을 잘 활용하며, 적절한 타입을 사용합니다.
                                <p className="description">
                                    객체지향 프로그래밍에 익숙하기 때문에 상속 등을 통한 클래스
                                    타입에도 강점을 지닙니다.
                                </p>
                            </li>
                            <li>
                                Generic에 익숙합니다.
                                <p className="description">
                                    {
                                        'Generic과 더불어 다양한 문법들 ex) Overloading, Tuple 등을 이용한 코딩을 할 수 있습니다.'
                                    }
                                </p>
                            </li>
                        </ul>

                        <h4>JavaScript</h4>
                        <ul>
                            <li>ES2015 이후의 JavaScript 문법에 익숙합니다.</li>
                            <li>
                                JavaScript ES2015 이상의 문법을 수월하게 작성하거나 읽을 수
                                있습니다.
                            </li>
                            <li>Vanilla JavaScript를 통해 DOM을 다루는데 익숙합니다.</li>
                            <li>Reduce, Map과 같은 고차함수를 적극적으로 사용합니다.</li>
                            <li>비동기 작업을 하는데 익숙합니다. (promise, async await)</li>
                        </ul>

                        <h4>React</h4>
                        <ul>
                            <li>
                                React 기반의 CSR/SSR 프론트엔드 개발에 익숙하고, 리렌더링 최적화,
                                번들 경량화 등 기본적인 웹 성능 최적화 경험이 있습니다.
                            </li>
                            <li>
                                React hooks를 사용하여 적절하게 데이터를 분배합니다.
                                <p className="description">
                                    Custom hooks을 줄곧 잘 쓰며, Context API를 사용하여 맥락에 맞는
                                    컴포넌트 상태 격리를 통한 구현이 가능합니다.
                                </p>
                            </li>
                            <li>
                                스니펫, 탬플릿을 활용하여 관리 쉽고 유지보수 용이하게 Folder
                                Structure를 구성합니다.
                            </li>
                            <li>
                                Redux와 같은 상태 관리 패턴에 대해서 사용해봤으며, 복잡한 코딩을
                                피합니다. 상태 관리 패턴이 소스가 길어질 수록 레거시가 많이 쌓이기
                                때문입니다.
                            </li>
                            <li>
                                Container 와 Presentational의 차이점을 인지하고 구조를 서버에서
                                데이터 받는 부분과 데이터를 뿌려주는 부분을 명확하게 작성합니다
                            </li>
                            <li>
                                Atomic Design으로 컴포넌트 분할을 하거나 프로젝트에 맞게 구조를
                                작성합니다.
                            </li>
                            <li>React 컴포넌트 라이프 사이클을 이해하여 적절하게 활용합니다.</li>
                        </ul>

                        <h4>Server</h4>
                        <ul>
                            <li>
                                Express.js를 활용하여 간단하게 RESTful API를 작성할 수 있습니다.
                            </li>
                            <li>
                                라우팅 규칙을 적절하게 사용하여 경로를 작성합니다.
                                <p className="description">
                                    http 프로토콜에 기반하여 심플하고 이해하기 쉽고 확장성있는
                                    엔드포인트를 선호합니다.
                                </p>
                            </li>
                            <li>
                                JWT 인증을 사용하여 브라우저 쿠키에 저장하고 세션 처리를 할 수
                                있습니다.
                            </li>
                        </ul>
                        <h4>DevOps</h4>
                        <ul>
                            <li>
                                자동화 프로세스를 만들어서 팀 내 생산성을 높힙니다.
                                <p className="description">코드리뷰 자동화 프로세스</p>
                            </li>
                            <li>AWS EC2, ECS, S3 등의 인프라 요소를 사용해본 경험이 있습니다.</li>
                            <li>Jenkins, Docker를 사용하여 개발 환경을 구축할 수 있습니다.</li>
                            <li>
                                Github Action, docker compose, AWS S3 사용하여 무중단배포를 구축할
                                수 있습니다.
                            </li>
                            <li>
                                Nginx 설정을 다룰 수 있으며, PM2, Nginx를 통해 로그 분석이
                                가능합니다.
                            </li>
                            <li>
                                Lambda 등 AWS의 서버리스 인프라에 익숙하고, 프론트엔드에서 필요한
                                수준의 서버 또는 인프라를 구성하고 유지보수할 수 있습니다.
                            </li>
                        </ul>
                        <h4>그 외</h4>
                        <ul>
                            <li>
                                Git을 능숙하게 다룰 수 있습니다.
                                <p className="description">
                                    git flow, github flow, gitlab flow를 회사에서 적용해본 경험이
                                    있습니다.
                                </p>
                            </li>
                            <li>
                                JsDoc을 적극적으로 활용합니다.
                                <p className="description">
                                    코드의 사용법과 용도를 최대한 가깝게 이해할 수 있도록 합니다.
                                    <br />
                                    이를 위해 기능 로직, 컴포넌트 마다 최대한의 문서화를 제공하기
                                    위해 노력합니다.
                                </p>
                            </li>
                        </ul>
                    </ul>
                    <h3>경력</h3>
                    <ul>
                        <li>
                            비즈니스 로직을 쉽게 테스트하고 격리할 수 있는 클래스 기반 모델 레이어
                            설계
                        </li>

                        <li>
                            {
                                'Vue -> React 전환 경험, 전환하는 이유 등 시장의 형태에 따른 프로덕트 구축 가능'
                            }
                        </li>
                        <li>
                            {
                                'CRA -> SSR (Loadable Component -> Next.js) 점진적 고도화 진행, 기술적으로 왜 필요한지 이해'
                            }
                        </li>
                    </ul>
                </article>
            </StaticComponentEdit>
        </section>
    );
}

export const documentProps = {
    description: '언제나 준비된 개발자가되기 위해',
    title: '김대한의 CV',
};
