import { ReactNode } from 'react';
import { GrClose } from 'react-icons/gr';
import { styled } from 'styled-components';

import { Portal } from '../Portal';

const StyledPopup = styled.div`
    background-color: var(--background-color);
    height: 70%;
    width: 70%;
    z-index: 1;
    position: fixed;
    margin: auto;
    display: block;
    bottom: 0px;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    border: 1px solid var(--active-color);

    .portal-close {
        position: absolute;
        right: 1.2rem;
        top: 1.2rem;
        line-height: 0.6rem;
        padding: 0;
        background-color: transparent;
        border: none;
        > svg {
            width: 2rem;
            height: 2rem;
        }
    }
`;

export interface IPopupProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose?: (
        event?: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
    ) => React.MouseEventHandler<HTMLElement> | undefined | void;
    style?: React.CSSProperties;
}
/**
 * @param isOpen
 * @param props.onClose - isOpen=false 변경, 모달을 닫을 수 있는 X 아이콘이 표시됩니다.
 * @param props.PopupName - url history에 #?PopupName={isOpen} 해시 쿼리를 추가하여 모달이 하나의 경로를 가지도록 합니다.
 * @param props.setPopup - 모달의 오픈 여부를 지정해주는 함수 (PopupName 값이 있다면 필수로 주어야하는 값입니다)
 * @example
 * case1: '일반 모달 사용'
 * <Popup
 *     isOpen={test.isOpen}
 *     onClose={() => setPopup('test', false)}
 * >
 *     <TestPopup/>
 * </Popup>
 */
export default function Popup({ children, isOpen = false, onClose, style }: IPopupProps) {
    if (!isOpen) return null;

    return (
        <Portal>
            <StyledPopup style={style}>
                {onClose && (
                    <button className="portal-close" onClick={onClose} type="button">
                        <GrClose />
                    </button>
                )}
                {children}
            </StyledPopup>
        </Portal>
    );
}
