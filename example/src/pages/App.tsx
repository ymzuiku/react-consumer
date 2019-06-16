import * as React from 'react';

import * as dispatchs from '../dispatchs';
import { Consumer, dispatchRoute } from '../store';

export const App: React.FC = () => {
  return (
    <div>
      <header>
        <h3>App Page</h3>
        <Consumer>{state => <h3>Route: {JSON.stringify(state.route.paths)} </h3>}</Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => dispatchRoute.push('/user', { dog: 'wangwang' })}>Go User Page</button>
        <button onClick={() => dispatchRoute.push('/infinite-list')}>Go To InfiniteList Page</button>
      </header>
      <section>
        <Consumer>{state => <div>{state.user.info.num}</div>}</Consumer>
      </section>
    </div>
  );
};
