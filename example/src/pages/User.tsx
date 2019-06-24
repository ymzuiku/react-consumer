import * as React from 'react';

import * as dispatchs from '../dispatchs';
import { Consumer, dispatchRoute } from '../store';

export const User: React.FC = () => {
  return (
    <div>
      <header>
        <h3>User Page</h3>
        <Consumer memo={st => st.route.paths}>{st => <h3>Route: {JSON.stringify(st.route.paths)} </h3>}</Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => dispatchRoute.push('/infinite-list')}>Go To InfiniteList Page</button>
        <button onClick={() => dispatchRoute.back()}>Go Back</button>
      </header>
      <section>
        <Consumer>{st => <div>{st.user.info.num}</div>}</Consumer>
      </section>
    </div>
  );
};
