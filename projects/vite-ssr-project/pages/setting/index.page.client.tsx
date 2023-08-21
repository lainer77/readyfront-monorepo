import RenderMark from '#components/RenderMark';
import { Link, Route, Routes } from 'react-router-dom';

export { Page };
function Setting() {
    return (
        <div>
            <h3>setting</h3>
            <Link className="navitem" to="/setting">
                setting
            </Link>
            <Link className="navitem" to="/setting/options">
                options
            </Link>
        </div>
    );
}
function Options() {
    return (
        <div>
            <h3>Options</h3>
            <Link className="navitem" to="/setting">
                setting
            </Link>
            <Link className="navitem" to="/setting/options">
                options
            </Link>
        </div>
    );
}
function Page() {
    return (
        <>
            <RenderMark type="CSR" />
            <Routes>
                <Route element={<Setting />} path="/setting/*" />
                <Route element={<Options />} path="/setting/options" />
            </Routes>
        </>
    );
}
