import produce from 'immer';
import * as React from 'react';

export interface IStore<S> extends React.Context<S> {
  /**
   * 全局状态
   */
  state: S;
  /**
   * 安全的获取全局状态
   * getState(s=>s.dog) return { name: 'dog', age: 10}
   * getState(s=>s.dog.cat[10].abc) return undefined
   */
  getState(fn?: (state: S) => S | any): S | any;
  /**
   * 更新全局状态，及发布视图更新
   */
  setState(fn: (state: S) => void): any;
}

export interface IConsumerProps<S> {
  /**
   * children
   */
  children(state: S): any;
  /**
   * 设置 useMemo 在 props
   */
  memo?(state: S): any[];
}

/**
 * 实例化 {store, Consumer, Provider}
 */
export function createStateManager<S>(initalState: S) {
  // 创建一个  context, 用于后续配合 useContext 进行更新组件
  const store = React.createContext(initalState) as IStore<S>;

  store.state = initalState;
  store.setState = fn => {
    store.state = produce(store.state, fn);
  };
  store.getState = fn => {
    if (fn) {
      try {
        return fn(store.state);
      } catch (err) {
        return undefined;
      }
    }

    return store.state;
  };

  // 创建一个提供者组件
  const Provider: React.FC = props => {
    const [state, setState] = React.useState<S>(store.state);

    // 使用 immer 进行更新状态, 确保未更新的对象还是旧的引用
    store.setState = fn => setState(produce(state, fn));
    store.state = state;

    return <store.Provider value={state} {...props} />;
  };

  // 创建一个消费者组件
  const Consumer: React.FC<IConsumerProps<S>> = ({ children, memo }) => {
    const state = React.useContext<S>(store);

    return React.useMemo(
      () => {
        return children(state);
      },
      // tslint:disable-next-line
      memo ? memo(state) : undefined,
    );
  };

  return { Provider, store, Consumer };
}
