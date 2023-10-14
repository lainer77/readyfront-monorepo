import { MarkdownViewer } from '#components/MarkdownViewer';

import { useIssue } from '../_hooks';

export function IssuePopup() {
    const {
        issue: { boardList, selectedBoardIndex = 0, selectedCardIndex },
    } = useIssue.supply();

    if (selectedCardIndex === undefined || selectedCardIndex < 0) return null;

    const board = boardList[selectedBoardIndex];
    const cardList = board.list[selectedCardIndex];

    if (!board || !cardList) return null;

    let body = cardList.body;

    if (Array.isArray(body)) body = body.map((t) => `${t}<br/>`).join('');

    return (
        <div style={{ padding: '3rem' }}>
            <MarkdownViewer>{body}</MarkdownViewer>
        </div>
    );
}
