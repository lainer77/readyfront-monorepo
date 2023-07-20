import { EditComponent } from '../../renderer/components/EditComponent';

export function Page() {
    return (
        <EditComponent>
            <section>
                <h2>안녕하세요.</h2>
                <h2>좋은 사용자 경험을 고민하는</h2>
                <h2>프론트 개발자 김대한입니다.</h2>
                <ul>
                    <li>UI, UX에 대해 이야기하고 개선하는 과정을 좋아합니다.</li>
                    <li>기록하고 돌아보고 개선하는 과정을 좋아합니다.</li>
                    <li>도전적이고 투명하며 화기애애한 조직을 좋아합니다.</li>
                    <li>
                        구성원들이 조직의 비전을 함께 구체화하고 공감할 수 있는 조직을 좋아합니다.
                    </li>
                </ul>
            </section>
        </EditComponent>
    );
}

export const documentProps = {
    description: '언제나 준비된 개발자가되기 위해',
    title: '김대한의 CV',
};
