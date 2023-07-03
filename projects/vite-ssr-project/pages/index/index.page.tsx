import { Counter } from '@common/components';

export { Page };

function Page() {
    return (
        <>
            <h1>Welcome</h1>
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
    description: 'Welcome',
    title: 'Home',
};
