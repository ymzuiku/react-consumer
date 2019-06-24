import * as React from 'react';
import { FixedSizeList as List } from 'react-window';

import * as dispatchs from '../dispatchs';
import { Consumer, dispatchRoute, Route, store } from '../store';

export interface IRow {
  index: number;
  style: React.CSSProperties;
}

const Row = ({ index, style }: IRow) => {
  return (
    <div style={style}>
      <Consumer memo={st => [st.user.infinite[index]]}>{st => <div> Row {st.user.infinite[index]}</div>}</Consumer>
      <button onClick={() => dispatchs.changeInfiniteIndex(index)}>add number</button>
    </div>
  );
};

export const InfiniteList: React.FC = () => {
  return (
    <div>
      <header>
        <h3>Infinite Page</h3>
        <Consumer memo={st => st.route.paths}>{st => <h3>Route: {JSON.stringify(st.route.paths)} </h3>}</Consumer>
        <button onClick={() => dispatchRoute.replace({ dog: Math.random() })}>Replace params</button>
        <button onClick={() => dispatchRoute.back()}>Go Back</button>
        <button onClick={() => dispatchRoute.back(0)}>Go Root Page</button>
        <Route path="/infinite-list/aaa">
          <h5>Other aaa</h5>
        </Route>
      </header>
      <section>
        <List height={450} itemCount={store.state.user.infinite.length} itemSize={100} width={375}>
          {({ index, style }) => <Row index={index} style={style} />}
        </List>
      </section>
    </div>
  );
};
