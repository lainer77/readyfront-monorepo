import { tCardItem } from '#atoms/issue';
import { Card } from '#components/Card';

export { IssueCard };
function IssueCard({
    data,
    dragEnter,
    dragStart,
    draggable,
    drop,
    onClick,
}: {
    data: tCardItem;
    dragEnter: React.DragEventHandler<HTMLDivElement>;
    dragStart: React.DragEventHandler<HTMLDivElement>;
    draggable: boolean;
    drop: React.DragEventHandler<HTMLDivElement>;
    onClick: () => void;
}) {
    return (
        <Card
            draggable={draggable}
            onDragEnd={drop}
            onDragEnter={dragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragStart={dragStart}
        >
            {data.header && <Card.Header>{data.header}</Card.Header>}
            <Card.Body>{data.body}</Card.Body>
            {data.body.length > 0 && <Card.Action onClick={onClick}>자세히</Card.Action>}
        </Card>
    );
}
