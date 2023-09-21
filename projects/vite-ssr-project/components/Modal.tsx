import { useModalRoute } from '@common/utils';
import { ReactNode } from 'react';

import { Portal } from './Portal';

export interface IModalProps {
    children: ReactNode;
    isOpen?: boolean;
    modalName?: string;
    onClose?: (
        event?: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
    ) => React.MouseEventHandler<HTMLElement> | undefined | void;
    setModal?: (isOpen: boolean) => void;
    style?: React.CSSProperties;
}
/**
 * @param isOpen
 * @param props.onClose - isOpen=false 변경, 모달을 닫을 수 있는 X 아이콘이 표시됩니다.
 * @param props.modalName - url history에 #?modalName={isOpen} 해시 쿼리를 추가하여 모달이 하나의 경로를 가지도록 합니다.
 * @param props.setModal - 모달의 오픈 여부를 지정해주는 함수 (modalName 값이 있다면 필수로 주어야하는 값입니다)
 * @example
 * case1: '일반 모달 사용'
 * <Modal
 *     isOpen={test.isOpen}
 *     onClose={() => setModal('test', false)}
 * >
 *     <TestModal/>
 * </Modal>
 * case2: 'url history에 #?modalName={isOpen} 해시 쿼리를 추가하여 모달이 하나의 경로를 가지도록 합니다.'
 * <Modal
 *     modalName="test"
 *     isOpen={test.isOpen}
 *     setModal={isOpen => setModal('test', isOpen)}
 * >
 *     <TestModal onClose={() => setModal('test', false)} />
 * </Modal>
 */
export default function Modal({
    children,
    isOpen = false,
    modalName,
    onClose,
    setModal,
    style,
}: IModalProps) {
    useModalRoute(modalName, isOpen, setModal);

    if (!isOpen) return null;

    return (
        <Portal wrapperId="root-portal">
            <div style={style}>
                {onClose && (
                    <button className="portal-close" onClick={onClose} type="button">
                        X
                    </button>
                )}
                {children}
            </div>
        </Portal>
    );
}
