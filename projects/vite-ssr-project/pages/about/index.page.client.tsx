import './code.css';

export { Page, documentProps };

function Page() {
    return (
        <>
            <h1>About</h1>
            <p>
                Example of using <code>vite-plugin-ssr</code>.
            </p>
        </>
    );
}

const documentProps = {
    description: 'vite-plugin-ssr',
    title: 'About',
};
