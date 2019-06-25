import * as React from 'react';

import * as dispatchs from '../dispatchs';
import { Consumer, dispatchRoute } from '../store';

export const App: React.FC = () => {
  return (
    <div>
      <header>
        <h3>App Page</h3>
        <Consumer memo={st => st.route.paths}>{st => <h3>Route: {JSON.stringify(st.route.paths)} </h3>}</Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => dispatchRoute.push('/user', { dog: 'wangwang', cc: ['123', 33, 'aaa'] })}>
          Go User Page
        </button>
        <button onClick={() => dispatchRoute.push('/infinite-list')}>Go To InfiniteList Page</button>
      </header>
      <section>
        <Consumer>{(_, get) => <div>get:{get(st => st.user.info.num)}</div>}</Consumer>
      </section>
    </div>
  );
};
