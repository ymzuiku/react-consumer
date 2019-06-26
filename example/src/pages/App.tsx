import * as React from 'react';

import * as dispatchs from '../dispatchs';
import { Consumer, dispatchRoute } from '../store';

export const App: React.FC = () => {
  return (
    <div>
      <header>
        <h3>App Page</h3>
        <Consumer memo={st => [st.route.paths]}>{([paths]) => <h4>Route: {JSON.stringify(paths)} </h4>}</Consumer>
        <Consumer memo={st => [st.route.params[st.route.params.length - 1]]}>
          {([param]) => <h4>Param: {JSON.stringify(param)} </h4>}
        </Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => dispatchRoute.push('/user', { dog: 'wangwang', cc: ['123', 33, 'aaa'] })}>
          Go User Page
        </button>
        <button onClick={() => dispatchRoute.push('/infinite-list')}>Go To InfiniteList Page</button>
      </header>
      <section>
        <Consumer memo={st => [st.user.info.num]}>{([num]) => <div>get:{num}</div>}</Consumer>
      </section>
    </div>
  );
};
