import './App.scss';
import CanvasSection from './components/CanvasSection';
import Content from './components/Content';
import Footer from './components/Footer';
import Portfolio from './components/Portfolio';
// import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <>
            {/* <Header /> */}
            <CanvasSection />
            <Sidebar />
            <Content />
            <Portfolio />
            <Footer />
        </>
    );
}

export default App;
