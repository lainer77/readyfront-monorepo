import { homeAtom } from '#atoms/index';
import { useRecoilValue } from 'recoil';

/**
 * 컴포넌트에 데이터를 공급해주기 위한 훅
 * - useParams, useSearchParams, useRecoilValue 등이 사용됨
 * - useEffect, useLayoutEffect 사용금지
 * @returns params, searchParams, data, state, constants
 */
function useHomeSupply() {
    const home = useRecoilValue(homeAtom);

    return {
        // constants
        // state
        home,
    };
}
export type tSupplyReturns = ReturnType<typeof useHomeSupply>;

export default { supply: useHomeSupply };
