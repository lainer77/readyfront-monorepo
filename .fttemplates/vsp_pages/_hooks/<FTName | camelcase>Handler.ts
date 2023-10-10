import { <FTName | camelcase>Atoms } from '#atoms/index';
import { useSetRecoilState } from 'recoil';

export default function use<FTName | capitalize>Handler() {
    const set<FTName | capitalize> = useSetRecoilState(<FTName | camelcase>Atoms)
    const handleFunc = () =>{
        //
        // set<FTName | capitalize>()
    }
    return { handleFunc };
}
