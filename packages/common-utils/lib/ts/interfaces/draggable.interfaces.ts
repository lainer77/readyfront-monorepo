/* eslint-disable no-unused-vars */
import _ from 'lodash';

import { tDivMouseEvent, tDivTouchEvent, tDraggableDirection } from '../types';

export interface IDraggableVariables {
    direction?: 'x' | 'y';
    distance: number;
    pressed: boolean;
    previousX: number;
    previousY: number;
    timestamp: number;
    x: number;
    y: number;
}
export interface IDraggableReturn {
    onMouseDown: (e: tDivMouseEvent) => void;
    onMouseEnter: (e: tDivMouseEvent) => void;
    onMouseLeave: (e: tDivMouseEvent) => void;
    onMouseMove: _.DebouncedFunc<(e: tDivMouseEvent) => void>;
    onMouseUp: (e: tDivMouseEvent) => void;
    onTouchEnd: (e: tDivTouchEvent) => void;
    onTouchMove: _.DebouncedFunc<(e: tDivTouchEvent) => void>;
    onTouchStart: (e: tDivTouchEvent) => void;
    variables: IDraggableVariables;
}
export interface IDraggableOptions {
    /**
     * - 'x' | 'y' | 'x|y'| 'x&y'(default)
     * - 'x|y': x방향과 y방향 둘다 드래그 가능하지만 한번에 한 방향으로만 가능
     * - 'x&y': x방향과 y방향을 통시에 드래그 가능
     */
    direction?: tDraggableDirection;
    onEnd?: (variables: IDraggableVariables) => IDraggableVariables | void;
    onMove?: (variables: IDraggableVariables) => IDraggableVariables | void;
    onPressedToggle?: (pressed: boolean) => IDraggableVariables | void;
    onStart?: (variables: IDraggableVariables) => IDraggableVariables | void;
    wait?: number;
}
