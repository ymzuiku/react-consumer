import { IRouteProps } from './createRoute';
/**
 * 创建状态管理及路由控制
 */
export declare function bindRouteManager<S>(store: any): {
    Route: {
        new (props: IRouteProps): {
            haveChild: boolean;
            state: {
                display: string;
                realChild: any;
                isRenderChild: boolean;
            };
            hiddenChild: () => void;
            onHistoryUpdate: () => void;
            render(): JSX.Element;
            showChild: () => void;
            context: any;
            setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IRouteProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
            forceUpdate(callBack?: () => void): void;
            readonly props: Readonly<IRouteProps> & Readonly<{
                children?: import("react").ReactNode;
            }>;
            refs: {
                [key: string]: import("react").ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<IRouteProps>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
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
            display: string;
            sync: string;
            keep: boolean;
        };
        contextType?: import("react").Context<any>;
    };
    history: import("./createHistory").IHistory;
};
