import { tBoardItem } from '#atoms/issue';
import { CardBoard } from '#components/CardBoard';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { IssueCard } from '../_components/IssueCard';
import { useIssue } from '../_hooks';

export function BoardsContainer() {
    const { boardList, setBoardList, setSelectedCardIndex } = useIssue.boardListSupply().handler();

    const dragItem = useRef<number>(); // 드래그할 아이템의 인덱스
    const dragOverItem = useRef<number>(); // 드랍할 위치의 아이템의 인덱스
    const naviator = useNavigate();
    // 드래그 시작될 때 실행
    const dragStart = (position: number) => () => {
        dragItem.current = position;
    };

    // 드래그중인 대상이 위로 포개졌을 때
    const dragEnter = (position: number) => () => {
        dragOverItem.current = position;
    };

    // 드랍 (커서 뗐을 때)
    const drop = (listIndex: number) => {
        if (dragItem.current === undefined || dragOverItem.current === undefined) return;
        const nlist = [...boardList];

        const newList = [...nlist[listIndex].list];
        const dragItemValue = newList[dragItem.current];
        newList.splice(dragItem.current, 1);
        newList.splice(dragOverItem.current, 0, dragItemValue);
        dragItem.current = undefined;
        dragOverItem.current = undefined;

        nlist[listIndex] = { ...nlist[listIndex], list: newList };
        setBoardList(nlist);
    };

    const renderCardList = (data: tBoardItem, listIndex: number) => {
        return data.list.map((item, index) => (
            <IssueCard
                onClick={() => {
                    setSelectedCardIndex(item.id);
                    naviator(`/issue/${item.id}`, { replace: true });
                }}
                data={item}
                dragEnter={dragEnter(index)}
                dragStart={dragStart(index)}
                draggable={data.draggable}
                drop={() => drop(listIndex)}
                key={`card-${index}`}
            />
        ));
    };

    return boardList.map((board, index) => (
        <CardBoard key={`card-board-${index}`}>{renderCardList(board, index)}</CardBoard>
    ));
}
