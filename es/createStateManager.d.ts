import * as React from 'react';
export interface IConsumerProps<S> {
    memo?: any[];
    beforeUnmount?(subscribeData: any[]): any;
    beforeUpdate?(subscribeData: any[]): any;
    children(...subscribeData: any): any;
    subscribe?(state: S): any[];
}
/**
 * 实例化 {store, Consumer}
 */
export declare function createStateManager<S>(initalState: S): {
    store: {
        listen: (fn: (state: S) => any) => () => void;
        getState: () => S;
        subscribes: Set<unknown>;
        update: (fn: (state: S) => void) => void;
    };
    Consumer: {
        new (props: IConsumerProps<S>): {
            lastData: any[];
            state: {
                num: number;
            };
            unListen: any;
            componentWillUnmount(): void;
            handleListen: (s: S) => void;
            render(): any;
            shouldComponentUpdate: (nextProps: any, nextState: any) => boolean;
            context: any;
            setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IConsumerProps<S>>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
            forceUpdate(callBack?: () => void): void;
            readonly props: Readonly<IConsumerProps<S>> & Readonly<{
                children?: React.ReactNode;
            }>;
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
