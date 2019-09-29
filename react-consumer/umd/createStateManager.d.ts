import * as React from 'react';
export interface IConsumerProps<S> {
    memo?: any[];
    onMount?(subscribeData: any[]): any;
    onUnmount?(subscribeData: any[]): any;
    onUpdate?(subscribeData: any[]): any;
    children(...subscribeData: any): any;
    subscribe?(state: S): any[];
}
/**
 * 实例化 {store, Consumer}
 */
export declare function createStateManager<S>(initalState: S, update: (state: S, fn: (s: S) => any) => any): {
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
            componentDidMount(): void;
            componentWillUnmount(): void;
            handleListen: (s: S) => void;
            render(): any;
            shouldComponentUpdate: (nextProps: any, nextState: any) => boolean;
            context: any;
            setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IConsumerProps<S>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callBack?: (() => void) | undefined): void;
            readonly props: Readonly<IConsumerProps<S>> & Readonly<{
                children?: React.ReactNode;
            }>;
            refs: {
                [key: string]: React.ReactInstance;
            };
        };
        contextType?: React.Context<any> | undefined;
    };
};
