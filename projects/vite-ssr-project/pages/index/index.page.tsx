import RenderMark from '~components/RenderMark';
import { StaticComponentEdit } from '~components/StaticComponentEdit';
import axios from 'axios';
import { useEffect, useState } from 'react';

import './home.scss';

export function Page(pageProps: { data: string }) {
    const [defaultCode, setDefaultCode] = useState(pageProps.data);

    useEffect(() => {
        if (defaultCode !== pageProps.data) setDefaultCode(pageProps.data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageProps.data]);

    const handleHomeElementUpdate = (newCode: string) => {
        let code = newCode;
        if (code.startsWith('render('))
            code = code.replace('render(', '').replace(');', '').replace(/,$/, '');
        axios.put('http://localhost:3000/@api/cdn/html/home.html', { data: code }).then(() => {
            setDefaultCode(code);
        });
    };

    return (
        <section>
            <RenderMark type="SSR" />
            <StaticComponentEdit
                defaultCode={`render(${defaultCode})`}
                onEdit={handleHomeElementUpdate}
            />
        </section>
    );
}

export const documentProps = {
    description: '언제나 준비된 개발자가되기 위해',
    title: '김대한의 CV',
};
