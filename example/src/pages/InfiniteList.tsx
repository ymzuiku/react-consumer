import * as React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Consumer, history, Route, store } from 'store';

import * as dispatchs from '../dispatchs';

export interface IRow {
  index: number;
  style: React.CSSProperties;
}

const Row = ({ index, style }: IRow) => {
  return (
    <div style={style}>
      <Consumer memo={st => [st.user.infinite[index]]}>
        {([id]) => <div> Row {id}</div>}
      </Consumer>
      <button onClick={() => dispatchs.changeInfiniteIndex(index)}>
        change this {index}
      </button>
    </div>
  );
};

export const InfiniteList: React.FC = () => {
  return (
    <div>
      <header>
        <h3>Infinite Page</h3>
        <Consumer memo={st => [st.paths]}>
          {([paths]) => <h4>Route: {JSON.stringify(paths)} </h4>}
        </Consumer>
        <Consumer memo={st => [st.status['/InfiniteList']]}>
          {([param]) => <h4>Param: {JSON.stringify(param)} </h4>}
        </Consumer>
        <button
          onClick={() =>
            history.replace('/InfiniteList', { dog: Math.random() })
          }
        >
          Replace params
        </button>
        <button onClick={() => history.pop()}>Go Back</button>
        <button onClick={() => history.pop(0)}>Go Root Page</button>
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
