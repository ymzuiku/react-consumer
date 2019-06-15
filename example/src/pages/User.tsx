import * as React from 'react';

import * as dispatchs from '../dispatchs';
import { Consumer } from '../store';

export const User: React.FC = () => {
  return (
    <div>
      <header>
        <h3>User Page</h3>
      </header>
      <section>
        <Consumer>{state => <div>{state.user.info.num}</div>}</Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => dispatchs.routeBack()}>Go Back</button>
        <button onClick={() => dispatchs.routePush('/infinite-list')}>Go To InfiniteList Page</button>
      </section>
    </div>
  );
};
