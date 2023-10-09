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
        // URL에서 토큰을 추출하여 로컬 스토리지에 저장
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('auth_token', token);

            urlParams.delete('token');
            const newUrl = urlParams.toString()
                ? `${window.location.pathname}?${urlParams.toString()}`
                : window.location.pathname;
            window.history.replaceState({}, '', newUrl);
        }
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
            const authToken = localStorage.getItem('auth_token');
            axios
                .put(
                    `${
                        import.meta.env.VITE_API_GATEWAY_URL || import.meta.env.VITE_HOST
                    }/@api/cdn/html/${fileName}.html`,
                    { data: code },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`, // 헤더에 토큰을 추가합니다.
                        },
                    },
                )
                .then(() => {
                    setData((d) => ({ ...d, [fileName]: code }));
                    alert(`${fileName}이 수정되었습니다`);
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        alert(err.response.data);
                    } else if (err.response.status === 402) {
                        alert(err.response.data);
                        localStorage.removeItem('auth_token');
                    } else console.log(err);
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
