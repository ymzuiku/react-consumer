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
export declare function createStateManager<S>(initalState: S): {
    Provider: React.FunctionComponent<{}>;
    store: IStore<S>;
    Consumer: React.FunctionComponent<IConsumerProps<S>>;
};
