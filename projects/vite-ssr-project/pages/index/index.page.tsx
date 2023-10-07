import RenderMark from '#components/RenderMark';
import { StaticComponentEdit } from '@common/components';
import axios from 'axios';
import { useEffect, useState } from 'react';

import './home.scss';

export function Page(pageProps: { experience: string; introduction: string; skills: string }) {
    const [data, setData] = useState(pageProps);

    useEffect(() => {
        if (
            pageProps.experience !== data.experience ||
            pageProps.introduction !== data.introduction ||
            pageProps.skills !== data.skills
        )
            setData(pageProps);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageProps.experience]);

    const handleHomeElementUpdate =
        (fileName: 'experience' | 'introduction' | 'skills') => (newCode: string) => {
            if (!newCode || newCode === undefined || newCode === 'undefined') return;
            let code = newCode;
            if (code.startsWith('render('))
                code = code
                    .replace(/^render\(/, '')
                    .replace(/;|,$/, '')
                    .replace(/\),?$/, '');
            axios
                .put(
                    `${
                        import.meta.env.VITE_API_GATEWAY_URL || import.meta.env.VITE_HOST
                    }/@api/cdn/html/${fileName}.html`,
                    { data: code },
                )
                .then(() => {
                    setData((d) => ({ ...d, [fileName]: code }));
                });
        };

    return (
        <>
            <article className="cv-content">
                <StaticComponentEdit
                    defaultCode={`render(${data.introduction})`}
                    onEdit={handleHomeElementUpdate('introduction')}
                />

                <StaticComponentEdit
                    defaultCode={`render(${data.experience})`}
                    onEdit={handleHomeElementUpdate('experience')}
                />
                <StaticComponentEdit
                    defaultCode={`render(${data.skills})`}
                    onEdit={handleHomeElementUpdate('skills')}
                />
            </article>
            <RenderMark type="SSR" />
        </>
    );
}
