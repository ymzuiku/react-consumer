import produce from 'immer';
import * as React from 'react';

export interface IConsumerProps<S> {
  /**
   * children
   */
  children(state: S): any;
  /**
   * 设置 useMemo 在 props
   */
  listen?(state: S): void;
  /**
   * 设置 useMemo 在 props
   */
  memo?(state: S): any[];
}

/**
 * 实例化 {store, Consumer}
 */
export function createStateManager<S>(initalState: S) {
  // 创建一个  context, 用于后续配合 useContext 进行更新组件
  let idNumber = 0;
  const subscribes: { [key: number]: (state: S) => any } = {};

  const store = {
    /**
     * 安全的获取全局状态
     * getState(s=>s.dog) return { name: 'dog', age: 10}
     * getState(s=>s.dog.cat[10].abc) return undefined
     */
    getState: (fn: (state: S) => any) => {
      if (fn) {
        try {
          return fn(store.state);
        } catch (err) {
          return undefined;
        }
      }

      return store.state;
    },
    /**
     * 更新全局状态，及发布视图更新
     */
    setState: (fn: (state: S) => void) => {
      store.state = produce(store.state, (draft: S) => fn(draft));
      // tslint:disable-next-line
      for (const k in subscribes) {
        subscribes[k](store.state);
      }
    },
    /**
     * 全局状态
     */
    state: initalState,
    /**
     * 订阅列表
     */
    subscribes,
  };

  const listren = (fn: (state: S) => any) => {
    idNumber++;
    if (idNumber > 999999998) {
      idNumber = 0;
    }
    const id = idNumber;
    subscribes[id] = fn;

    return () => {
      // tslint:disable-next-line
      delete subscribes[id];
    };
  };

  class Consumer extends React.Component<IConsumerProps<S>> {
    private lastMemo: any[] = [];
    private readonly unListen: () => void;
    public constructor(props: IConsumerProps<S>) {
      super(props);
      if (this.props.memo !== undefined) {
        this.lastMemo = [...this.props.memo(store.state)];
      }

      this.unListen = listren(this.handleListen);
    }

    public componentWillUnmount() {
      this.unListen();
    }

    public handleListen = (state: S) => {
      const { listen, memo } = this.props;
      if (listen !== undefined) {
        listen(state);
      }
      if (memo !== undefined) {
        if (memo.length === 0) {
          return;
        }
        const nowMemo = memo(store.state);
        let isNeedUpdate = false;
        for (let i = 0; i < this.lastMemo.length; i++) {
          if (this.lastMemo[i] !== nowMemo[i]) {
            isNeedUpdate = true;
            break;
          }
        }
        if (isNeedUpdate) {
          this.lastMemo = [...nowMemo];
          this.forceUpdate();
        }
      } else {
        this.forceUpdate();
      }
    };

    public render() {
      return this.props.children(store.state);
    }

    public shouldComponentUpdate = () => {
      return false;
    };
  }

  return { store, Consumer };
}
