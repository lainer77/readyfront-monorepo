import RenderMark from '#components/RenderMark';
import { StaticComponentEdit } from '@common/components';
import axios from 'axios';
import { useEffect, useState } from 'react';

import './home.scss';

export function Page() {
    const [data, setData] = useState<{ experience: string; introduction: string; skills: string }>({
        experience: '',
        introduction: '',
        skills: '',
    });

    useEffect(() => {
        Promise.all([
            axios.get('/api/cdn/html/introduction.html'),
            axios.get('/api/cdn/html/experience.html'),
            axios.get('/api/cdn/html/skills.html'),
        ]).then((res) => {
            setData({ experience: res[1].data, introduction: res[0].data, skills: res[2].data });
        });
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
    }, []);

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
                    }/api/cdn/html/${fileName}.html`,
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
                {data.introduction && (
                    <StaticComponentEdit
                        defaultCode={`render(${data.introduction})`}
                        onEdit={handleHomeElementUpdate('introduction')}
                    />
                )}
                {data.experience && (
                    <StaticComponentEdit
                        defaultCode={`render(${data.experience})`}
                        onEdit={handleHomeElementUpdate('experience')}
                    />
                )}
                {data.skills && (
                    <StaticComponentEdit
                        defaultCode={`render(${data.skills})`}
                        onEdit={handleHomeElementUpdate('skills')}
                    />
                )}
            </article>
            <RenderMark type="SSR" />
        </>
    );
}
