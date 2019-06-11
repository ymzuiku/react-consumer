import * as React from 'react';
import { Consumer } from '../store';
import * as dispatchs from '../dispatchs';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <h3>App Page</h3>
      </header>
      <section>
        <Consumer>{state => <div>{state.user.info.num}</div>}</Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => dispatchs.routePush('/user', { dog: 'wangwang' })}>Go User Page</button>
      </section>
    </div>
  );
};

export default App;
