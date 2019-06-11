/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import immer from 'immer';

export interface Store<S> extends React.Context<S> {
  setState(fn: (state: S) => void): void;
  state: S;
}

export interface ConsumerProps<S> {
  children: (state: S) => any;
  memo?: (state: S) => Array<any>;
}

export default function createStateManager<S>(initalState: S) {
  // 创建一个  context, 用于后续配合 useContext 进行更新组件
  const store = React.createContext(initalState) as Store<S>;

  store.state = initalState;
  store.setState = fn => {
    store.state = immer(store.state, (v: S) => fn(v));
  };

  // 创建一个提供者组件
  const Provider: React.FC = props => {
    const [state, setState] = React.useState<S>(store.state);

    // 使用 immer 进行更新状态, 确保未更新的对象还是旧的引用
    store.setState = fn => setState(immer(state, (v: S) => fn(v)));
    store.state = state;

    return <store.Provider value={state} {...props} />;
  };

  // 创建一个消费者组件
  const Consumer = ({ children, memo }: ConsumerProps<S>) => {
    const state = React.useContext<S>(store);

    return React.useMemo(
      () => {
        return children(state);
      },
      memo ? memo(state) : void 0,
    );
  };

  return { Provider, store, Consumer };
}
