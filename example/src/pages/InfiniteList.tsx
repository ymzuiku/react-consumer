import { Consumer, Route, routeMap, store } from 'controller';
import * as React from 'react';
import { FixedSizeList as List } from 'react-window';

import * as dispatchs from '../dispatchs';

export interface IRow {
  index: number;
  style: React.CSSProperties;
}

const Row = ({ index, style }: IRow) => {
  return (
    <div style={style}>
      <Consumer subscrib={s => [s.user.infinite[index]]}>
        {id => <div> Row {id}</div>}
      </Consumer>
      <button onClick={() => dispatchs.changeInfiniteIndex(index)}>
        change this {index}
      </button>
    </div>
  );
};

export const InfiniteList: React.FC = () => {
  return (
    <div style={{ background: '#fff' }}>
      <header>
        <h3>Infinite Page</h3>
        <Consumer subscrib={s => [s.paths]}>
          {paths => <h4>Route: {JSON.stringify(paths)} </h4>}
        </Consumer>
        <Consumer subscrib={s => [s.status['/InfiniteList']]}>
          {param => <h4>Param: {JSON.stringify(param)} </h4>}
        </Consumer>
        <button
          onClick={() =>
            routeMap.replace('/InfiniteList', { dog: Math.random() })
          }
        >
          Replace params
        </button>
        <button onClick={() => routeMap.pop()}>Go Back</button>
        <button onClick={() => routeMap.pop(0)}>Go Root Page</button>
        <Route path="/infinite-list/aaa">
          <h5>sub-route</h5>
        </Route>
      </header>
      <section>
        <List
          height={450}
          itemCount={store.state.user.infinite.length}
          itemSize={100}
          width={375}
        >
          {({
            index,
            style,
          }: {
            index: number;
            style: React.CSSProperties;
          }) => <Row index={index} style={style} />}
        </List>
      </section>
    </div>
  );
};
