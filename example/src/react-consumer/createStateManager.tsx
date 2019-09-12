import produce from 'immer';
import * as React from 'react';

export interface IConsumerProps<S> {
  /* beforeUnmount */
  beforeUnmount?(memo: any[]): any;
  /* beforeUpdate */
  beforeUpdate?(memo: any[]): any;
  /* children */
  children(...memo: any): any;
  /* 订阅需要更新的对象 在 props */
  subscribe(state: S): any[];
}

/**
 * 实例化 {store, Consumer}
 */
export function createStateManager<S>(initalState: S) {
  // 创建一个  context, 用于后续配合 useContext 进行更新组件
  const subscribes = new Set();

  const listen = (fn: (state: S) => any) => {
    subscribes.add(fn);

    return () => {
      // tslint:disable-next-line
      subscribes.delete(fn);
    };
  };

  let state = initalState as any;

  const store = {
    /* 订阅 */
    listen,
    /* 全局状态 */
    getState: () => state as S,
    /* 订阅列表 */
    subscribes,
    /* 更新全局状态，及发布视图更新 */
    update: (fn: (state: S) => void) => {
      state = produce(store.getState(), (draft: S) => {fn(draft)});

      subscribes.forEach(value => {
        const sub = value as (state: S) => any;
        sub(state);
      });
    },
  };

  const Consumer = class extends React.Component<IConsumerProps<S>> {
    public lastMemo: any[] = [];
    public unListen: () => void;
    public constructor(props: IConsumerProps<S>) {
      super(props);
      if (this.props.subscribe === undefined) {
        throw new Error('<Consumer /> need "subscrib" props');
      }
      this.lastMemo = [...this.props.subscribe(store.getState())];

      this.unListen = listen(this.handleListen);
    }

    public componentWillUnmount() {
      this.unListen();
      if (this.props.beforeUnmount) {
        this.props.beforeUnmount(this.lastMemo);
      }
    }

    public handleListen = (s: S) => {
      const { beforeUpdate, subscribe: subscrib } = this.props;

      const nowMemo = subscrib(store.getState());

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
          beforeUpdate(nowMemo);
        }
        this.forceUpdate();
      }
    };

    public render() {
      return this.props.children(...this.lastMemo);
    }

    public shouldComponentUpdate = () => {
      return false;
    };
  };

  return { store, Consumer };
}
