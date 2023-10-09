import { MouseEvent, TouchEvent } from 'react';

export type tDivMouseEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;
export type tDivTouchEvent = TouchEvent<HTMLDivElement>;

export type tDraggableDirection = 'x&y' | 'x' | 'x|y' | 'y';

export type * from './supplier.types';
