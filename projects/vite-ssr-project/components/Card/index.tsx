import { IDraggableOptions } from '@common/utils';
import { HTMLProps } from 'react';

import './Card.scss';

export { Card, tCardProps };
type tCardProps = IDraggableOptions & { draggable?: boolean } & HTMLProps<HTMLDivElement>;

function Card({ children, draggable, ...divProps }: tCardProps) {
    return (
        <div className="card" {...divProps} draggable={draggable}>
            {children}
        </div>
    );
}
Card.Header = function CardHeader({ children, ...rest }: HTMLProps<HTMLDivElement>) {
    return (
        <div className="card-header" {...rest}>
            {children}
        </div>
    );
};

Card.Body = function CardBodyHeader({ children, ...rest }: HTMLProps<HTMLDivElement>) {
    if (Array.isArray(children))
        return (
            <div className="card-body" {...rest}>
                {children[0]}
                {` ... `}
            </div>
        );
    return <div className="card-body">{children}</div>;
};

Card.Action = function CardBodyHeader({ children, ...rest }: HTMLProps<HTMLDivElement>) {
    return (
        <div className="card-action" {...rest}>
            {children}
        </div>
    );
};
