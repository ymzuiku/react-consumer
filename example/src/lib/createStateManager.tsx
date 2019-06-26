import produce from 'immer';
import * as React from 'react';

export interface IConsumerProps<S> {
  /**
   * beforeUpdate
   */
  beforeUpdate?(memo: any[], state: S): void;
  /**
   * children
   */
  children(memo: any[], state: S): any;
  /**
   * 设置 useMemo 在 props
   */
  memo(state: S): any[];
}

/**
 * 实例化 {store, Consumer}
 */
export function createStateManager<S>(initalState: S) {
  // 创建一个  context, 用于后续配合 useContext 进行更新组件
  const subscribes = new Set();

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

      subscribes.forEach(value => {
        const sub = value as (state: S) => any;
        sub(store.state);
      });
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
    subscribes.add(fn);

    return () => {
      // tslint:disable-next-line
      subscribes.delete(fn);
    };
  };

  const Consumer = class extends React.Component<IConsumerProps<S>> {
    public lastMemo: any[] = [];
    public unListen: () => void;
    private isInited = false;
    public constructor(props: IConsumerProps<S>) {
      super(props);
      this.lastMemo = [...this.props.memo(store.state)];

      this.unListen = listren(this.handleListen);
    }

    public componentDidMount() {
      this.isInited = true;
    }

    public componentWillUnmount() {
      this.unListen();
    }

    public handleListen = (state: S) => {
      const { beforeUpdate, memo } = this.props;

      const nowMemo = memo(store.state);
      let isNeedUpdate = false;

      for (let i = 0; i < this.lastMemo.length; i++) {
        if (this.lastMemo[i] !== nowMemo[i]) {
          isNeedUpdate = true;
          break;
        }
      }

      this.lastMemo = [...nowMemo];

      if (isNeedUpdate) {
        if (beforeUpdate !== undefined) {
          beforeUpdate(nowMemo, store.state);
        }
        this.forceUpdate();
      }
    };

    public render() {
      return this.props.children(this.lastMemo, store.state);
    }

    public shouldComponentUpdate = () => {
      return false;
    };
  };

  return { store, Consumer };
}
