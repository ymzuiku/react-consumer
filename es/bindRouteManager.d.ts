/// <reference types="react" />
import { IRouteProps } from './createRoute';
/**
 * 创建状态管理及路由控制
 */
export declare function bindRouteManager<S>(store: any): {
    Route: {
        new (props: IRouteProps): {
            animeTimer: any;
            realChild: any;
            state: {
                isRenderChild: any;
                realChild: any;
                style: {
                    display: string;
                    position: string;
                    zIndex: number;
                };
            };
            unListen: () => any;
            componentDidMount(): void;
            componentWillUnmount(): void;
            onHistoryUpdate: () => void;
            render(): JSX.Element;
            context: any;
            setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IRouteProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
            forceUpdate(callBack?: () => void): void;
            readonly props: Readonly<IRouteProps> & Readonly<{
                children?: import("react").ReactNode;
            }>;
            refs: {
                [key: string]: import("react").ReactInstance;
            };
            shouldComponentUpdate?(nextProps: Readonly<IRouteProps>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<IRouteProps>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<IRouteProps>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<IRouteProps>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<IRouteProps>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<IRouteProps>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<IRouteProps>, nextState: Readonly<{}>, nextContext: any): void;
        };
        defaultProps: {
            sync: string;
            keep: boolean;
            animeTime: number;
        };
        contextType?: import("react").Context<any>;
    };
    routeMap: import("./createHistory").IHistory;
};
