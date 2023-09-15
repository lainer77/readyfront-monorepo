/* eslint-disable no-undef */
import _ from 'lodash';
import { useRef } from 'react';

import type {
    IDraggableOptions,
    IDraggableReturn,
    IDraggableVariables,
    tDivMouseEvent,
    tDivTouchEvent,
} from '../ts';

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
    const _options = {
        direction: 'x&y',
        wait: 30,
        ...options,
    };
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
    const leaveTimeRef = useRef<NodeJS.Timeout | undefined>();

    const onPressedToggle = (target: EventTarget & HTMLDivElement, pressed: boolean) => {
        if (!element) return;
        variables.pressed = pressed;
        target.style.cursor = pressed ? 'grabbing' : 'grab';
        _options.onPressedToggle?.(pressed);
    };

    const onMouseEnter = (e: tDivMouseEvent) => {
        e.stopPropagation();
        if (leaveTimeRef.current) onPressedToggle(e.currentTarget, true);
        e.currentTarget.style.cursor = 'grab';
    };
    const onMouseDown = (e: tDivMouseEvent) => {
        e.stopPropagation();
        onPressedToggle(e.currentTarget, true);

        variables.previousX = e.clientX;
        variables.previousY = e.clientY;

        _options.onStart?.(variables);
    };
    const onMouseMove = _.debounce((e: tDivMouseEvent) => {
        e.stopPropagation();
        if (!variables.pressed || !element) return;

        const x = e.clientX - variables.previousX;
        const y = e.clientY - variables.previousY;

        if (_options.direction === 'x|y') {
            if (!variables.direction) variables.direction = Math.abs(x) >= Math.abs(y) ? 'x' : 'y';
            if (variables.direction === 'x') {
                variables.x += x;
                variables.previousX = e.clientX;
            } else {
                variables.y += y;
                variables.previousY = e.clientY;
            }
        } else {
            if (_options.direction !== 'y') {
                variables.x += x;
                variables.previousX = e.clientX;
            }
            if (_options.direction !== 'x') {
                variables.y += y;
                variables.previousY = e.clientY;
            }
        }

        element.style.transform = `translate3d(${variables.x}px, ${variables.y}px, 0)`;
        // element.style.transform = `translate(${variables.x}px, ${variables.y}px)`;
        _options.onMove?.(variables);

        variables.distance = Math.abs(e.movementX) + Math.abs(e.movementY);
        variables.timestamp = Date.now();
    }, _options.wait);
    const onMouseUp = (e: tDivMouseEvent) => {
        e.stopPropagation();

        if (!variables.pressed) return;
        onPressedToggle(e.currentTarget, false);

        variables.direction = undefined;
        _options.onEnd?.(variables);
    };
    const onMouseLeave = (e: tDivMouseEvent) => {
        e.stopPropagation();

        if (!variables.pressed) return;
        onPressedToggle(e.currentTarget, false);
        leaveTimeRef.current = setTimeout(() => {
            leaveTimeRef.current = undefined;
            if (!variables.pressed) return;
            variables.direction = undefined;
            _options.onEnd?.(variables);
        }, 100);
    };

    const onTouchStart = (e: tDivTouchEvent) => {
        e.stopPropagation();
        onPressedToggle(e.currentTarget, true);

        variables.previousX = e.touches[0].pageX;
        variables.previousY = e.touches[0].pageY;

        _options.onStart?.(variables);
    };
    const onTouchEnd = (e: tDivTouchEvent) => {
        e.stopPropagation();
        if (!variables.pressed) return;
        onPressedToggle(e.currentTarget, false);

        variables.direction = undefined;

        _options.onEnd?.(variables);
    };
    const onTouchMove = _.throttle((e: tDivTouchEvent) => {
        e.stopPropagation();
        if (!variables.pressed || !element) return;

        const x = e.touches[0].pageX - variables.previousX;
        const y = e.touches[0].pageY - variables.previousY;

        if (_options.direction === 'x|y') {
            if (!variables.direction) variables.direction = Math.abs(x) >= Math.abs(y) ? 'x' : 'y';
            if (variables.direction === 'x') {
                variables.x += x;
                variables.previousX = e.touches[0].pageX;
            } else {
                variables.y += y;
                variables.previousY = e.touches[0].pageY;
            }
        } else {
            if (_options.direction !== 'y') {
                variables.x += x;
                variables.previousX = e.touches[0].pageX;
            }
            if (_options.direction !== 'x') {
                variables.y += y;
                variables.previousY = e.touches[0].pageY;
            }
        }

        element.style.transform = `translate3d(${variables.x}px, ${variables.y}px, 0)`;
        // element.style.transform = `translate(${variables.x}px, ${variables.y}px)`;
        if (_options.onMove) _options.onMove(variables);

        variables.distance = Math.abs(x) + Math.abs(y);
        variables.timestamp = Date.now();
    }, _options.wait);

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
