import * as React from 'react';
import { immerUpdater } from './immerUpdater';

export interface IConsumerProps<S> {
  memo?: any[];
  /* onBeforeMount */
  onMount?(subscribeData: any[]): any;
  /* onBeforeUnmount */
  onUnmount?(subscribeData: any[]): any;
  /* onBeforeUpdate */
  onUpdate?(subscribeData: any[]): any;
  /* children */
  children(...subscribeData: any): any;
  /* 订阅需要更新的对象 在 props */
  subscribe?(state: S): any[];
}

/**
 * 实例化 {store, Consumer}
 */
export function createStateManager<S>(initalState: S, updater: (state: S, fn: (s: S) => any) => any = immerUpdater) {
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
      state = updater(store.getState(), fn);

      subscribes.forEach(value => {
        const sub = value as (state: S) => any;
        sub(state);
      });
    },
  };

  const Consumer = class extends React.Component<IConsumerProps<S>> {
    public lastData: any[] = [];
    public state = {
      num: 0,
    };
    public unListen = null as any;
    public constructor(props: IConsumerProps<S>) {
      super(props);
      if (this.props.subscribe) {
        this.lastData = [...this.props.subscribe(store.getState())];

        this.unListen = listen(this.handleListen);
      }
    }

    public componentDidMount() {
      if (this.props.onMount) {
        this.props.onMount(this.lastData);
      }
    }

    public componentWillUnmount() {
      if (this.unListen) {
        this.unListen();
        this.unListen = null;
      }
      if (this.props.onUnmount) {
        this.props.onUnmount(this.lastData);
      }
    }

    public handleListen = (s: S) => {
      const { onUpdate: beforeUpdate, subscribe } = this.props;

      const nowData = subscribe!(store.getState());

      let isNeedUpdate = false;

      for (let i = 0; i < this.lastData.length; i++) {
        if (this.lastData[i] !== nowData[i]) {
          isNeedUpdate = true;
          break;
        }
      }

      this.lastData = [...nowData];

      if (isNeedUpdate) {
        if (beforeUpdate !== undefined) {
          beforeUpdate(nowData);
        }
        this.setState(({ num }: { num: number }) => ({
          num: num > 9990 ? 1 : num + 1,
        }));
      }
    };

    public render() {
      return this.props.children(...this.lastData);
    }

    public shouldComponentUpdate = (nextProps: any, nextState: any) => {
      if (nextState.num !== this.state.num) {
        return true;
      }

      if (nextProps.memo) {
        const { memo } = this.props as any;
        let isNeedUpdate = false;
        for (let i = 0; i < memo.length; i++) {
          if (nextProps.memo[i] !== memo[i]) {
            isNeedUpdate = true;
            break;
          }
        }

        return isNeedUpdate;
      }

      return false;
    };
  };

  return { store, Consumer };
}
