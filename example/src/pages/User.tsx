import * as React from 'react';

import * as dispatchs from '../dispatchs';
import { Consumer, dispatchRoute } from '../store';

export const User: React.FC = () => {
  return (
    <div>
      <header>
        <h3>User Page</h3>
        <Consumer memo={(st) => [st.route.paths]}>{([paths]) => <h3>Route: {JSON.stringify(paths)} </h3>}</Consumer>
        <Consumer memo={(st) => [st.route.params[st.route.params.length - 1]]}>
          {([param]) => <h4>Param: {JSON.stringify(param)} </h4>}
        </Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => dispatchRoute.push('/infinite-list')}>Go To InfiniteList Page</button>
        <button onClick={() => dispatchRoute.pop()}>Go Back</button>
      </header>
      <section>
        <Consumer memo={(st) => [st.user.info.num]}>{([num]) => <div>{num}</div>}</Consumer>
      </section>
    </div>
  );
};
