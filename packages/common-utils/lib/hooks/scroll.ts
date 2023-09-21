import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export function useWindowScroll(delay = 15) {
    const [scrollY, setScrollY] = useState<number>(0);

    const listener = () => {
        setScrollY(window.pageYOffset);
    };

    useEffect(() => {
        window.addEventListener('scroll', debounce(listener, delay));
        return () => window.removeEventListener('scroll', listener);
    });

    return [scrollY];
}

export function useElScroll(el?: HTMLElement | null, delay = 15) {
    const [scrollY, setScrollY] = useState<number>(0);

    const listener = () => {
        if (el?.scrollTop) setScrollY(el?.scrollTop > 0 ? el?.scrollTop : 0);
    };
    useEffect(() => {
        if (!el) return;

        el.addEventListener('scroll', debounce(listener, delay));
        return () => {
            if (!el) return;
            el.removeEventListener('scroll', listener);
        };
    }, [el, delay]);

    return [scrollY];
}
