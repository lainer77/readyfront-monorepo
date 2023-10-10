import { <FTName | camelcase>Atom } from '#atoms/index';
import { useRecoilValue } from 'recoil';

/**
 * 컴포넌트에 데이터를 공급해주기 위한 훅
 * - useParams, useSearchParams, useRecoilValue 등이 사용됨
 * - useEffect, useLayoutEffect 사용금지
 * @returns params, searchParams, data, state, constants
 */
function use<FTName | capitalize>Supply() {
    const <FTName | camelcase> = useRecoilValue(<FTName | camelcase>Atom);

    return {
        // constants
        // state
        <FTName | camelcase>,
    };
}
export type tSupplyReturns = ReturnType<typeof use<FTName | capitalize>Supply>;

export default { supply: use<FTName | capitalize>Supply };
