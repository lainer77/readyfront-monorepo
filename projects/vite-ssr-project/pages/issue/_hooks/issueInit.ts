import { homeAtom, issueAtoms } from '#atoms/index';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export default function useIssueInit() {
    const { issueId = '' } = useParams<{ issueId: string }>();
    const setSelectedCardIndex = useSetRecoilState(issueAtoms.selectedCardIndex);

    useEffect(() => {
        setSelectedCardIndex(parseInt(issueId) || 0);
    }, [issueId, setSelectedCardIndex]);
}
