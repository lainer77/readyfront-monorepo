import { homeAtom } from '#atoms/index';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

export default function useHomeInit() {
    const [home, setHome] = useRecoilState(homeAtom);
    const ref = useRef(false);
    useEffect(() => {
        if (!ref.current && !home.experience && !home.introduction && !home.skills) {
            ref.current = true;
            Promise.all([
                axios.get('/api/cdn/html/introduction.html'),
                axios.get('/api/cdn/html/experience.html'),
                axios.get('/api/cdn/html/skills.html'),
            ]).then((res) => {
                setHome({
                    experience: res[1].data,
                    introduction: res[0].data,
                    skills: res[2].data,
                });
            });
        }
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
    }, []);
}
