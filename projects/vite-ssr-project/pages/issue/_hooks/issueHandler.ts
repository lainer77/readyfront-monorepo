import { issueAtoms } from '#atoms/issue';
import { useSetRecoilState } from 'recoil';

export default function useHomeHandler() {
    const setBoardList = useSetRecoilState(issueAtoms.boardList);
    const setSelectedBoardIndex = useSetRecoilState(issueAtoms.selectedBoardIndex);
    const setSelectedCardIndex = useSetRecoilState(issueAtoms.selectedCardIndex);

    return { setBoardList, setSelectedBoardIndex, setSelectedCardIndex };
}
