import * as React from 'react';
import { Consumer } from './store';
import * as dispatchs from './dispatchs';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Consumer>{state => <div>{state.user.info.num}</div>}</Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
      </header>
    </div>
  );
};

export default App;
