import { Counter } from '@common/components';

export { Page };

function Page() {
    return (
        <>
            <h1>안녕하세요. 좋은 경험을 추구하는 김대한입니다.</h1>
            <ul>
                <li>Rendered to HTML.</li>
                <li>
                    Interactive. <Counter />
                </li>
            </ul>
        </>
    );
}

export const documentProps = {
    description: '언제나 준비된 개발자가되기 위해',
    title: '김대한의 CV',
};
