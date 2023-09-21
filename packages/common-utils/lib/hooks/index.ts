export * from './useDraggable';
export * from './useWindowRescale';
import _ from 'lodash';
import {
    MouseEvent,
    MouseEventHandler,
    RefObject,
    TouchEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

import { imageCache } from '../helper';
import { Args, IDraggableOptions, IDraggableReturn, IDraggableVariables } from '../ts/interfaces';
import { tDivMouseEvent, tDivTouchEvent } from '../ts/types';
import { useElScroll, useWindowScroll } from './scroll';

export function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current && savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

/**
 * useElScroll element
 * @param el - scroll 값을 받아낼 element
 * @param delay - scroll delay, 성능에 영향을 미침
 * @returns [scrollTop]
 */
export function useScroll(el?: HTMLElement | null, delay?: number): number[];
/**
 * useScroll window
 * @param delay - scroll delay, 성능에 영향을 미침
 * @returns [scrollTop]
 */
export function useScroll(delay?: number): number[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useScroll(a: any, delay = 15) {
    return typeof a === 'number' ? useWindowScroll(a) : useElScroll(a, delay);
}

/**
 * useDraggable
 * @param element - HTMLDivElement
 * @param options - {@link IDraggableOptions}
 * @param options.direction -
 * - 'x' | 'y' | 'x|y'| 'x&y'(default)
 * - 'x|y': x방향과 y방향 둘다 드래그 가능하지만 한번에 한 방향으로만 가능
 * - 'x&y': x방향과 y방향을 통시에 드래그 가능
 * @param options.wait - 드래그 이벤트 성능 throttle wait 값(앱 성능에 영향을 미침니다)
 * @example
 * const { onMouseEnter, onMouseLeave, onMouseMove, onMouseDown } = useDraggable(el);
 * @example
 * const { onTouchEnd, onTouchMove, onTouchStart } = useDraggable(el);
 * @example
 * const { variables: { pressed, x, previousX } } = useDraggable(el, { direction: 'x' });
 * @return - {@link IDraggableReturn}
 */
export function useDraggable(
    element?: HTMLDivElement,
    options: IDraggableOptions | undefined = {
        direction: 'x&y',
        wait: 30,
    },
): IDraggableReturn {
    const { current: variables } = useRef<IDraggableVariables>({
        direction: undefined,
        distance: 0,
        pressed: false,
        previousX: 0,
        previousY: 0,
        timestamp: 0,
        x: 0,
        y: 0,
    });

    const onPressedToggle = (target: EventTarget & HTMLDivElement, pressed: boolean) => {
        if (!element) return;
        variables.pressed = pressed;
        target.style.cursor = pressed ? 'grabbing' : 'grab';
        options.onPressedToggle && options.onPressedToggle(pressed);
    };

    const onMouseEnter = (e: tDivMouseEvent) => {
        e.stopPropagation();
        e.currentTarget.style.cursor = 'grab';
    };
    const onMouseDown = (e: tDivMouseEvent) => {
        e.stopPropagation();
        onPressedToggle(e.currentTarget, true);
        if (options.onStart) options.onStart(variables);
    };
    const onMouseMove = _.throttle((e: tDivMouseEvent) => {
        e.stopPropagation();
        if (!variables.pressed || !element) return;

        if (options.direction === 'x|y') {
            if (!variables.direction)
                variables.direction = Math.abs(e.movementX) >= Math.abs(e.movementY) ? 'x' : 'y';
            if (variables.direction === 'x') {
                variables.x += e.movementX;
            } else {
                variables.y += e.movementY;
            }
        } else {
            if (options.direction?.match(/x/)) variables.x += e.movementX;
            if (options.direction?.match(/y/)) variables.y += e.movementY;
        }

        element.style.transform = `translate3d(${variables.x}px, ${variables.y}px, 0)`;
        // element.style.transform = `translate(${variables.x}px, ${variables.y}px)`;
        if (options.onMove) options.onMove(variables);

        variables.distance = Math.abs(e.movementX) + Math.abs(e.movementY);
        variables.timestamp = Date.now();
    }, options.wait);
    const onMouseUp = (e: tDivMouseEvent) => {
        e.stopPropagation();

        if (!variables.pressed) return;
        onPressedToggle(e.currentTarget, false);

        variables.direction = undefined;
        if (options.onEnd) options.onEnd(variables);
    };
    const onMouseLeave = (e: tDivMouseEvent) => {
        e.stopPropagation();

        if (!variables.pressed) return;
        onPressedToggle(e.currentTarget, false);

        variables.direction = undefined;
        if (options.onEnd) options.onEnd(variables);
    };

    const onTouchStart = (e: tDivTouchEvent) => {
        e.stopPropagation();
        onPressedToggle(e.currentTarget, true);

        variables.previousX = e.touches[0].pageX;
        variables.previousY = e.touches[0].pageY;

        if (options.onStart) options.onStart(variables);
    };
    const onTouchEnd = (e: tDivTouchEvent) => {
        e.stopPropagation();
        if (!variables.pressed) return;
        onPressedToggle(e.currentTarget, false);

        variables.direction = undefined;

        if (options.onEnd) options.onEnd(variables);
    };
    const onTouchMove = _.throttle((e: tDivTouchEvent) => {
        e.stopPropagation();
        if (!variables.pressed || !element) return;

        const x = e.touches[0].pageX - variables.previousX;
        const y = e.touches[0].pageY - variables.previousY;

        if (options.direction === 'x|y') {
            if (!variables.direction) variables.direction = Math.abs(x) >= Math.abs(y) ? 'x' : 'y';
            if (variables.direction === 'x') {
                variables.x += x;
                variables.previousX = e.touches[0].pageX;
            } else {
                variables.y += y;
                variables.previousY = e.touches[0].pageY;
            }
        } else {
            if (options.direction !== 'y') {
                variables.x += x;
                variables.previousX = e.touches[0].pageX;
            }
            if (options.direction !== 'x') {
                variables.y += y;
                variables.previousY = e.touches[0].pageY;
            }
        }

        element.style.transform = `translate3d(${variables.x}px, ${variables.y}px, 0)`;
        // element.style.transform = `translate(${variables.x}px, ${variables.y}px)`;
        if (options.onMove) options.onMove(variables);

        variables.distance = Math.abs(x) + Math.abs(y);
        variables.timestamp = Date.now();
    }, options.wait);

    return {
        onMouseDown,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        onMouseUp,
        onTouchEnd,
        onTouchMove,
        onTouchStart,
        variables,
    };
}

/**
 * useSlideable
 * @param element  - HTMLDivElement
 * @returns - handler, isSlide, startX
 */
export function useSlideable(element?: HTMLDivElement) {
    const [startX, setStartX] = useState<number | undefined>();
    const [isSlide, setIsSlide] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const movement = useRef(0);
    const onSlideStart: MouseEventHandler<HTMLDivElement> = (e) => {
        setIsStart(true);
        setStartX(e.pageX + (element?.scrollLeft || 0));
    };
    function scrollTo(el: HTMLElement, ac = 0, speed = 3) {
        const between = 16; // 이동 간격 시간
        let accel = ac;
        const direction = ac > 0 ? 1 : -1;
        const scroll = setInterval(function () {
            const pos = el.scrollLeft;
            const width = el.scrollWidth - el.clientWidth;

            if (accel !== 0 && pos !== 0 && pos < width) {
                el.scrollTo({ left: pos - accel * speed });
                accel = accel - direction / 5;

                if ((direction === 1 && accel < 0) || (direction === -1 && accel > 0))
                    clearInterval(scroll);
            } else {
                clearInterval(scroll);
            }
        }, between);
    }
    const onSlideEnd: MouseEventHandler<HTMLDivElement> = () => {
        if (isStart && element) {
            scrollTo(element, movement.current);
        }
        setTimeout(() => {
            setIsSlide(false);
        }, 16);
        setIsStart(false);
    };
    const onSlideMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (isStart && element) {
            setIsSlide(true);
            movement.current = e.movementX;
            element.scrollLeft = (startX || 0) - e.pageX;
        }
    };

    return {
        isSlide,
        isStart,
        onSlideEnd,
        onSlideMove,
        onSlideStart,
    };
}

export default function useLongPress<
    T = MouseEvent<HTMLDivElement, MouseEvent> & TouchEvent<HTMLDivElement>,
>(callback = (e: T) => e, ms = 300) {
    const [startLongPress, setStartLongPress] = useState(false);
    const [event, setEvent] = useState<T | undefined>();

    useEffect(() => {
        let timerId: number | undefined;
        if (startLongPress && event) {
            timerId = window.setTimeout(() => callback(event), ms);
        } else {
            clearTimeout(timerId);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [callback, ms, event, startLongPress]);

    return (e: T) => {
        setStartLongPress(true);
        setEvent(e);
    };
}

export function useModalRoute(
    modalName?: string,
    isOpen?: boolean,
    setModal?: (isOpen: boolean) => void,
) {
    const cm = useRef(isOpen);
    const [init, setInit] = useState(false);
    useEffect(() => {
        const func = () => {
            if (modalName) {
                const params = new URLSearchParams(window.location.hash.replace('#', ''));
                const value = params.get(modalName) == 'true';
                if (setModal) {
                    setModal(value);
                    cm.current = value;
                }
                setInit(true);
            }
        };
        func();
        modalName && window.addEventListener('hashchange', func);
        modalName && window.addEventListener('popstate', func);
        return () => {
            modalName && window.removeEventListener('hashchange', func);
            modalName && window.removeEventListener('popstate', func);
            setInit(false);
        };
    }, [modalName]);
    useEffect(() => {
        if (init && modalName) {
            const params = new URLSearchParams(window.location.hash.replace('#', ''));
            const value = params.get(modalName) == 'true';
            if (isOpen && value !== isOpen) {
                cm.current = true;
                params.set(modalName, 'true');
                window.location.hash = params.toString();
            } else if (!isOpen && value) {
                cm.current = false;
                params.delete(modalName);
                window.history.back();
            }
            setInit(false);
        }
    }, [isOpen]);
}

export function useIntersectionObserver(
    elementRef: RefObject<Element>,
    { freezeOnceVisible = false, root = null, rootMargin = '0%', threshold = 0 }: Args,
): IntersectionObserverEntry | undefined {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    useEffect(() => {
        const node = elementRef?.current; // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { root, rootMargin, threshold };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();
    }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen]);

    return entry;
}

export function usePreImageLoad(imageSrc: string[]) {
    const [isImgsLoaded, setImgsLoaded] = useState(false);
    useEffect(() => {
        if (imageSrc && imageSrc.length) {
            const loadImage = (src: (typeof imageSrc)[number]) => {
                return imageCache.read(src);
            };

            Promise.all(
                imageSrc.map((src) => {
                    if (src) return loadImage(src);
                    else setImgsLoaded(true);
                }),
            )
                .then(() => setImgsLoaded(true))
                .catch(() => {
                    setTimeout(() => {
                        setImgsLoaded(true);
                    }, 2000);
                });
        }
    }, [imageSrc]);

    return [isImgsLoaded, setImgsLoaded];
}
