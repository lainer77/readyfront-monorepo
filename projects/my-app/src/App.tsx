import { Counter } from '@common/components';
import { testLog } from '@common/utils';

import './App.css';
import logo from './logo.svg';

function App() {
    testLog({ age: 17, gender: 'male', memo: 'tetstetsets', name: 'test' });
    return (
        <div className="App">
            <header className="App-header">
                <img alt="logo" className="App-logo" src={logo} />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Learn React
                </a>
            </header>
            <Counter />
        </div>
    );
}

export default App;
