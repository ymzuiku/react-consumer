import * as React from 'react';
import { IHistory } from './createHistory';
export interface IRouteProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    component?: any;
    keep?: boolean;
    leaveTime?: number;
    loadTime?: number;
    path: string;
}
/**
 *  Route 使用 history.listen 而不使用 consumer 是因为 Route 属于非常固定的模式.
 *  Route 会常驻 ReactNode 对象树，使用 listen 可以有效减少不必要的 consumer 订阅。
 */
export declare function createRoute<S>(store: any, history: IHistory): {
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
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<IRouteProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
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
    contextType?: React.Context<any>;
};
