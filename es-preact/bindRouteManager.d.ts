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
            componentWillMount?(): void;
            getChildContext?(): object;
            componentWillReceiveProps?(nextProps: Readonly<IRouteProps>, nextContext: any): void;
            shouldComponentUpdate?(nextProps: Readonly<IRouteProps>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUpdate?(nextProps: Readonly<IRouteProps>, nextState: Readonly<{}>, nextContext: any): void;
            getSnapshotBeforeUpdate?(oldProps: Readonly<IRouteProps>, oldState: Readonly<{}>): any;
            componentDidUpdate?(previousProps: Readonly<IRouteProps>, previousState: Readonly<{}>, snapshot: any): void;
            componentDidCatch?(error: any, errorInfo: any): void;
            props: Readonly<IRouteProps & import("preact").Attributes & {
                children?: import("preact").ComponentChildren;
                ref?: import("preact").Ref<any>;
            }>;
            context: any;
            base?: Element | Text;
            setState<K extends never>(state: Partial<{}> | ((prevState: Readonly<{}>, props: Readonly<IRouteProps>) => Partial<{}> | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
            forceUpdate(callback?: () => void): void;
        };
        defaultProps: {
            sync: string;
            keep: boolean;
            animeTime: number;
        };
        displayName?: string;
        contextType?: import("preact").Context<any>;
        getDerivedStateFromProps?(props: object, state: object): object;
        getDerivedStateFromError?(error: any): object;
    };
    routeMap: import("./createHistory").IHistory;
};
