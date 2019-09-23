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
            componentWillMount?(): void;
            componentDidMount?(): void;
            getChildContext?(): object;
            componentWillReceiveProps?(nextProps: Readonly<IConsumerProps<S>>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<IConsumerProps<S>>, nextState: Readonly<{}>, nextContext: any): void;
            getSnapshotBeforeUpdate?(oldProps: Readonly<IConsumerProps<S>>, oldState: Readonly<{}>): any;
            componentDidUpdate?(previousProps: Readonly<IConsumerProps<S>>, previousState: Readonly<{}>, snapshot: any): void;
            componentDidCatch?(error: any, errorInfo: any): void;
            props: Readonly<IConsumerProps<S> & import("preact").Attributes & {
                children?: import("preact").ComponentChildren;
                ref?: import("preact").Ref<any>;
            }>;
            context: any;
            base?: Element | Text;
            setState<K extends never>(state: Partial<{}> | ((prevState: Readonly<{}>, props: Readonly<IConsumerProps<S>>) => Partial<{}> | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
            forceUpdate(callback?: () => void): void;
        };
        displayName?: string;
        defaultProps?: any;
        contextType?: import("preact").Context<any>;
        getDerivedStateFromProps?(props: object, state: object): object;
        getDerivedStateFromError?(error: any): object;
    };
};
