import React from 'react';

import logo from './logo.svg';
import Login  from './components/login'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Page from "./components/singlePage";

const App: React.FC = () => {
  return (
      <div>

          <Page isLogin={false}/>
        {/*<div className="App">*/}
      {/*<header className="App-header">*/}
        {/*/!*<img src={logo} className="App-logo" alt="logo" />*!/*/}

        {/*<p>*/}
          {/*Edit <code>src/App.tsx</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
          {/*className="App-link"*/}
          {/*href="https://reactjs.org"*/}
          {/*target="_blank"*/}
          {/*rel="noopener noreferrer"*/}
        {/*>*/}
          {/*Learn React*/}
        {/*</a>*/}
      {/*</header>*/}
    {/*</div>*/}
      </div>
  );
}

export default App;
