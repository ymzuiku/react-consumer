import { Consumer, routeMap } from 'controller';
import * as dispatchs from 'dispatchs';
import * as React from 'react';

export const User: React.FC = () => {
  return (
    <div style={{ background: '#fff' }}>
      <header>
        <h3>User Page</h3>
        <Consumer subscribe={s => [s.paths]}>
          {([paths]) => <h3>Route: {JSON.stringify(paths)} </h3>}
        </Consumer>
        <Consumer subscribe={s => [s.status['/User']]}>
          {param => <h4>Param: {JSON.stringify(param)} </h4>}
        </Consumer>
        <button onClick={dispatchs.addNumber}>add number</button>
        <button onClick={() => routeMap.push('/InfiniteList')}>
          Go To InfiniteList Page
        </button>
        <button onClick={() => routeMap.pop()}>Go Back</button>
      </header>
      <section>
        <Consumer subscribe={s => [s.user.info.num]}>
          {num => <div>{num}</div>}
        </Consumer>
      </section>
    </div>
  );
};
