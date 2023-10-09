import { homeAtoms } from '#atoms/index';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

export default function useHomeHandler() {
    const setIntroduction = useSetRecoilState(homeAtoms.introduction);
    const setSkills = useSetRecoilState(homeAtoms.skills);
    const setExperience = useSetRecoilState(homeAtoms.experience);
    const setHome = {
        experience: setExperience,
        introduction: setIntroduction,
        skills: setSkills,
    };
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
                    setHome[fileName](code);
                    // setHome((d) => ({ ...d, [fileName]: code }));
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

    return { handleHomeElementUpdate };
}
