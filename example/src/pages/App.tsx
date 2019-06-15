import * as React from 'react';

import * as dispatchs from '../dispatchs';
import { Consumer } from '../store';

export const App: React.FC = () => {
  return (
    <div>
      <header>
        <h3>App Page</h3>
      </header>
      <section>
        <Consumer>{state => <div>{state.user.info.num}</div>}</Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => dispatchs.routePush('/user', { dog: 'wangwang' })}>Go User Page</button>
        <button onClick={() => dispatchs.routePush('/infinite-list')}>Go To InfiniteList Page</button>
      </section>
    </div>
  );
};
