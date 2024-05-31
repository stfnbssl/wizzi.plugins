/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\examples\ittf\jsx1.ts.ittf
    utc time: Fri, 24 May 2024 16:02:38 GMT
*/
import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
function App() {
    const [count, setCount] = useState(0);
    return  (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a><a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a></div>
            <h1>
                Vite + React</h1>
            <div className="card">
                <button onClick={() => 
                        setCount(count => 
                            count + 1
                        )
                }>count is {count}</button>
                <p>
                    1 Edit <code>src/App.tsx</code>and save to test HMR
          2 Edit <code>src/App.tsx</code>and save to test HMR
        </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
      </p>
        </>
        )
    ;
}
export default App;
