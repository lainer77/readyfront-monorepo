import RenderMark from '#components/RenderMark';
import { Route, Routes } from 'react-router-dom';

import { IssuePage } from './IssuePage';
import { DetailPage } from './detail';

export { Page, documentProps, getDocumentProps };

function Page() {
    return (
        <>
            <Routes>
                <Route element={<IssuePage />} path="/issue/*" />
                <Route element={<IssuePage />} path="/issue/:issueId" />
                <Route element={<DetailPage />} path="/issue/detail/:issueId" />
            </Routes>
            <RenderMark type="CSR" />
        </>
    );
}

const documentProps = {
    description: 'Issue',
    title: 'Issue',
};
const getDocumentProps = () => console.log('issue');
