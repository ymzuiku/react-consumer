import * as React from 'react';

import * as dispatchs from '../dispatchs';
import { Consumer, dispatchRoute } from '../store';

export const User: React.FC = () => {
  return (
    <div>
      <header>
        <h3>User Page</h3>
        <Consumer>{state => <h3>Route: {JSON.stringify(state.route.paths)} </h3>}</Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => dispatchRoute.push('/infinite-list')}>Go To InfiniteList Page</button>
        <button onClick={() => dispatchRoute.back()}>Go Back</button>
      </header>
      <section>
        <Consumer>{state => <div>{state.user.info.num}</div>}</Consumer>
      </section>
    </div>
  );
};
