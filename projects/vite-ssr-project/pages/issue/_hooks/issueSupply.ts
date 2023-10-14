import { issueAtom, issueAtoms } from '#atoms/index';
import { useRecoilValue } from 'recoil';

/**
 * 컴포넌트에 데이터를 공급해주기 위한 훅
 * - useParams, useSearchParams, useRecoilValue 등이 사용됨
 * - useEffect, useLayoutEffect 사용금지
 * @returns params, searchParams, data, state, constants
 */
function useIssueSupply() {
    const issue = useRecoilValue(issueAtom);

    return {
        // constants
        // state
        issue,
    };
}
function useBoardList() {
    const boardList = useRecoilValue(issueAtoms.boardList);

    return {
        boardList,
    };
}
function useSelectedBoardIndex() {
    const selectedBoardIndex = useRecoilValue(issueAtoms.selectedBoardIndex);

    return {
        selectedBoardIndex,
    };
}
function useSelectedCardIndex() {
    const selectedCardIndex = useRecoilValue(issueAtoms.selectedCardIndex);

    return {
        selectedCardIndex,
    };
}
export type tSupplyReturns = ReturnType<
    | typeof useBoardList
    | typeof useIssueSupply
    | typeof useSelectedBoardIndex
    | typeof useSelectedCardIndex
>;

export default {
    boardListSupply: useBoardList,
    selectedBoardIndexSupply: useSelectedBoardIndex,
    selectedCardIndexSupply: useSelectedCardIndex,
    supply: useIssueSupply,
};
