import './App.scss';
import Content from './components/Content';
import Footer from './components/Footer';
// import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <>
            {/* <Header /> */}
            <Sidebar />
            <Content />
            <Footer />
        </>
    );
}

export default App;
