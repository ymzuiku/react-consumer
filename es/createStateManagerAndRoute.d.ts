import { IRouteProps } from './createRoute';
import { IConsumerProps } from './createStateManager';
export interface IRouteState {
    route: {
        params: object[];
        paths: string[];
    };
}
/**
 * 创建状态管理及路由控制
 */
export declare function createStateManagerAndRoute<S>(initState: S, defaultPath?: string): {
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
                children?: import("react").ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: import("react").ReactInstance;
            };
            componentDidMount?(): void;
            componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<IConsumerProps<S>>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<IConsumerProps<S>>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<IConsumerProps<S>>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<IConsumerProps<S>>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<IConsumerProps<S>>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<IConsumerProps<S>>, nextState: Readonly<{}>, nextContext: any): void;
        };
        contextType?: import("react").Context<any>;
    };
    store: {
        listren: (fn: (state: S) => any) => () => void;
        state: S;
        subscribes: Set<unknown>;
        updateState: (fn: (state: S) => void) => void;
    };
    Route: ({ path, children }: IRouteProps) => JSX.Element;
    dispatchRoute: {
        /**
         * 移走一个路由或者去到指定路径的路由，并且更新视图
         */
        back: (index?: number, stopBack?: boolean) => void;
        /**
         * 为route的变化添加监听，如果监听函数返回不是 true，则拦截此次的路由变化
         */
        listen: (fn: (path: string, param: object, state: S) => boolean) => void;
        /**
         * 推进一个新的路由，并且更新 AppState
         */
        push: (path: string, param?: {
            [key: string]: any;
        }, stopPush?: boolean) => void;
        /**
         * 替换当前路由状态
         */
        replace: (param: {
            [key: string]: any;
        }) => void;
    };
};
