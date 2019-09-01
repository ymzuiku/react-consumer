import { Consumer, routeMap } from 'controller';
import * as dispatchs from 'dispatchs';
import * as React from 'react';

export const App: React.FC = () => {
  return (
    <div style={{ background: '#fff' }}>
      <header>
        <h3>App Page</h3>
        <Consumer subscribe={s => [s.paths]}>
          {paths => <h4>Route: {JSON.stringify(paths)} </h4>}
        </Consumer>
        <Consumer subscribe={s => [s.status['/App']]}>
          {param => <h4>Param: {JSON.stringify(param)} </h4>}
        </Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button
          onClick={() =>
            routeMap.push('/User', { dog: 'wangwang', cc: ['123', 33, 'aaa'] })
          }
        >
          Go User Page
        </button>
        <button onClick={() => routeMap.push('/InfiniteList')}>
          Go To InfiniteList Page
        </button>
      </header>
      <section>
        <Consumer subscribe={s => [s.user.info.num]}>
          {num => <div>get:{num}</div>}
        </Consumer>
      </section>
    </div>
  );
};
