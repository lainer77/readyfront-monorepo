import { useEffect, useState } from 'react';

import './Swtich.scss';

export default function Swtich({
    onChange,
    value = false,
}: {
    onChange?: (checked: boolean) => void;
    value?: boolean;
}) {
    const [clicked, setClicked] = useState(value);
    const handleClick = () => {
        setClicked(!clicked);
        onChange?.(!clicked);
    };
    useEffect(() => {
        if (clicked !== value) setClicked(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <button
            className={`switch-container clickable ${clicked ? 'clicked' : ''}`}
            onClick={handleClick}
            type="button"
        >
            <div />
        </button>
    );
}
