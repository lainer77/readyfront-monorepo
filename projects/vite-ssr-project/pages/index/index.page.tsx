import { Counter } from '@common/components';

export { Page };

function Page() {
    return (
        <>
            <h1>김대한</h1>
            This page is:
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
