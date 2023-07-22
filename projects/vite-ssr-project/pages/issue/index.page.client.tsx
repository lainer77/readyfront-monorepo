import { Link, Route, Routes } from 'react-router-dom';

import RenderMark from '../../components/RenderMark';

export { Page };
function Issue() {
    return (
        <div>
            <h3>issue</h3>
            <Link className="navitem" to="/issue">
                issue
            </Link>
            <Link className="navitem" to="/issue/setting">
                Setting
            </Link>
        </div>
    );
}
function Setting() {
    return (
        <div>
            <h3>Setting</h3>
            <Link className="navitem" to="/issue">
                issue
            </Link>
            <Link className="navitem" to="/issue/setting">
                Setting
            </Link>
        </div>
    );
}
function Page() {
    return (
        <>
            <RenderMark type="CSR" />
            <Routes>
                <Route element={<Issue />} path="/issue/*" />
                <Route element={<Setting />} path="/issue/setting" />
            </Routes>
        </>
    );
}
