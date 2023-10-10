import { <FTName | camelcase>Atom } from '#atoms/index';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function useHomeInit() {
    const [<FTName | camelcase>, set<FTName | capitalize>] = useRecoilState(<FTName | camelcase>Atom);
    useEffect(() => {
        set<FTName | capitalize>(); // data setting
    }, []);
}
