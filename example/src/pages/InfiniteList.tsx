import * as React from 'react';
import { FixedSizeList as List } from 'react-window';

import * as dispatchs from '../dispatchs';
import { Consumer, IState, Route, store } from '../store';

export interface IRow {
  index: number;
  state: IState;
  style: React.CSSProperties;
}

const Row = ({ state, index, style }: IRow) => {
  return (
    <div style={style}>
      <div> Row {state.user.infinite[index]}</div>
      <button onClick={() => dispatchs.changeInfiniteIndex(index)}>add number</button>
    </div>
  );
};

export const InfiniteList: React.FC = () => {
  return (
    <div>
      <header>
        <h3>Infinite Page</h3>
        <Route path="/infinite-list/aaa">
          <h5>Other aaa</h5>
        </Route>
      </header>
      <section>
        <List height={450} itemCount={store.state.user.infinite.length} itemSize={100} width={375}>
          {({ index, style }) => (
            <Consumer memo={state => [state.user.infinite[index]]}>
              {state => <Row index={index} style={style} state={state} />}
            </Consumer>
          )}
        </List>
        <button onClick={() => dispatchs.routeBack()}>Go Back</button>
      </section>
    </div>
  );
};
