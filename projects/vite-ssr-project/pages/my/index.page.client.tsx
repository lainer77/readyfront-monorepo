import RenderMark from '~components/RenderMark';
import { Link, Route, Routes } from 'react-router-dom';

export { Page };
function My() {
    return (
        <div>
            <h3>My</h3>
            <Link className="navitem" to="/my">
                My
            </Link>
            <Link className="navitem" to="/my/setting">
                Setting
            </Link>
        </div>
    );
}
function Setting() {
    return (
        <div>
            <h3>Setting</h3>
            <Link className="navitem" to="/my">
                My
            </Link>
            <Link className="navitem" to="/my/setting">
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
                <Route element={<My />} path="/my/*" />
                <Route element={<Setting />} path="/my/setting" />
            </Routes>
        </>
        // </BrowserRouter>
    );
}
