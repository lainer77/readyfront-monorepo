import { useEffect } from 'react';

export const BASE_APP_MAX_WIDTH = 512;

export const BASE_APP_WIDTH = 375;
// viewportResponsiveBaseFontSize 계산을 위한 상수. 어떤 값을 사용해도 상관없다.
export const BASE_FONT_SIZE = 62.5; // = 10px = 1rem

export function useWindowRescale(callback?: () => boolean) {
    useEffect(() => {
        if (callback && !callback()) return;
        const html = document.getElementsByTagName('html');
        const width =
            window.outerWidth > BASE_APP_MAX_WIDTH ? BASE_APP_MAX_WIDTH : window.outerWidth;
        html[0].style.fontSize = `${(width / BASE_APP_WIDTH) * BASE_FONT_SIZE}%`;
        return () => {
            html[0].style.fontSize = '';
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
