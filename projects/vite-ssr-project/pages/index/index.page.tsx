import { StaticComponentEdit } from '../../renderer/components/StaticComponentEdit';

export function Page() {
    return (
        <StaticComponentEdit>
            <section>
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
                        구성원들이 조직의 비전을 함께 구체화하고 공감할 수 있는 조직을 좋아합니다.
                    </li>
                </ul>
                <hr />
                <h3>기술 및 역량 요약</h3>
                <ul>
                    <li>Javascript ES6+와 Typescript에 익숙합니다.</li>
                    <li>
                        React 기반의 CSR/SSR 프론트엔드 개발에 익숙하고, 리렌더링 최적화, 번들
                        경량화 등 기본적인 웹 성능 최적화 경험이 있습니다.
                    </li>
                    <li>
                        Node.js의 Module System인 CJS/ESM을 이해하고, 두 Module System 모두에 호환
                        가능한 라이브러리를 운영 해본 경험이 있습니다.
                    </li>
                    <li>
                        Lambda 등 AWS의 서버리스 인프라에 익숙하고, 프론트엔드에서 필요한 수준의
                        서버 또는 인프라를 구성하고 유지보수할 수 있습니다.
                    </li>
                    <li>
                        웹뷰 환경의 모바일 웹 제품 개발 경험이 있고 User-Agent 파싱, 앱브릿지 통신,
                        meta 태그 파싱 등 네이티브와 웹이 상호작용하는 패턴에 익숙합니다.
                    </li>
                </ul>
            </section>
        </StaticComponentEdit>
    );
}

export const documentProps = {
    description: '언제나 준비된 개발자가되기 위해',
    title: '김대한의 CV',
};
