import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export { IPortalProps, Portal };

function createWrapperAndAppendToBody(wrapperId: string) {
    const rootElement = document.querySelector('#root');
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    rootElement?.appendChild(wrapperElement);
    return wrapperElement;
}

interface IPortalProps {
    children: ReactNode;
    wrapperId?: string;
}

/**
 * @param warpperId - html 파일에 id=react-portal-wrapper를 가진 태그를 추가해야 사용 가능합니다.
 */
function Portal({ children, wrapperId = 'react-portal-wrapper' }: IPortalProps) {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element);

        return () => {
            if (element && systemCreated && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);

    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
}
