import * as dispatchs from 'dispatchs';
import * as React from 'react';
import { Consumer, history } from 'store';

export const App: React.FC = () => {
  return (
    <div>
      <header>
        <h3>App Page</h3>
        <Consumer memo={st => [st.paths]}>
          {([paths]) => <h4>Route: {JSON.stringify(paths)} </h4>}
        </Consumer>
        <Consumer memo={st => [st.status['/App']]}>
          {([param]) => <h4>Param: {JSON.stringify(param)} </h4>}
        </Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button
          onClick={() =>
            history.push('/User', { dog: 'wangwang', cc: ['123', 33, 'aaa'] })
          }
        >
          Go User Page
        </button>
        <button onClick={() => history.push('/InfiniteList')}>
          Go To InfiniteList Page
        </button>
      </header>
      <section>
        <Consumer memo={st => [st.user.info.num]}>
          {([num]) => <div>get:{num}</div>}
        </Consumer>
      </section>
    </div>
  );
};
