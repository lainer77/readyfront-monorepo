import RenderMark from '#components/RenderMark';

import { CVContent } from './_components/CVContent';
import { useHome } from './_hooks';
import './home.scss';

export function Page() {
    useHome.init();

    return (
        <>
            <CVContent />
            <RenderMark type="SSR" />
        </>
    );
}
