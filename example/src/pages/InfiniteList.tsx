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
      <Consumer memo={st => [st.user.infinite[index]]}>{([id]) => <div> Row {id}</div>}</Consumer>
      <button onClick={() => dispatchs.changeInfiniteIndex(index)}>change this {index}</button>
    </div>
  );
};

export const InfiniteList: React.FC = () => {
  return (
    <div>
      <header>
        <h3>Infinite Page</h3>
        <Consumer memo={st => [st.route.paths]}>{([paths]) => <h4>Route: {JSON.stringify(paths)} </h4>}</Consumer>
        <Consumer memo={st => [st.route.params[st.route.params.length - 1]]}>
          {([param]) => <h4>Param: {JSON.stringify(param)} </h4>}
        </Consumer>
        <button onClick={() => dispatchRoute.replace({ dog: Math.random() })}>Replace params</button>
        <button onClick={() => dispatchRoute.back()}>Go Back</button>
        <button onClick={() => dispatchRoute.back(0)}>Go Root Page</button>
        <Route path="/infinite-list/aaa">
          <h5>sub-route</h5>
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
