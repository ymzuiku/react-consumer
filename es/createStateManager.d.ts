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
export declare function createStateManager<S>(initalState: S): {
    store: {
        /**
         * 安全的获取全局状态
         * getState(s=>s.dog) return { name: 'dog', age: 10}
         * getState(s=>s.dog.cat[10].abc) return undefined
         */
        getState: (fn: (state: S) => any) => any;
        /**
         * 更新全局状态，及发布视图更新
         */
        setState: (fn: (state: S) => void) => void;
        /**
         * 全局状态
         */
        state: S;
        /**
         * 订阅列表
         */
        subscribes: {
            [key: number]: (state: S) => any;
        };
    };
    Consumer: {
        new (props: IConsumerProps<S>): {
            lastMemo: any[];
            unListen: () => void;
            componentWillUnmount(): void;
            handleListen: (state: S) => void;
            render(): any;
            shouldComponentUpdate: () => boolean;
            context: any;
            setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IConsumerProps<S>>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
            forceUpdate(callBack?: () => void): void;
            readonly props: Readonly<IConsumerProps<S>> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<IConsumerProps<S>>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<IConsumerProps<S>>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<IConsumerProps<S>>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<IConsumerProps<S>>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<IConsumerProps<S>>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<IConsumerProps<S>>, nextState: Readonly<{}>, nextContext: any): void;
        };
        contextType?: React.Context<any>;
    };
};
