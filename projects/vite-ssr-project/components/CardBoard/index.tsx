import { PropsWithChildren } from 'react';

import './CardBoard.scss';

export { CardBoard };

function CardBoard({ children }: PropsWithChildren) {
    return <div className="card-board">{children}</div>;
}
