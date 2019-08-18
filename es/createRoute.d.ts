import * as React from 'react';
import { IHistory } from './createHistory';
export interface IRouteProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    component?: any;
    display?: string;
    keep?: boolean;
    path: string;
    sync?: 'sync' | 'async' | 'preload' | string;
}
export declare function createRoute<S>(store: any, history: IHistory): {
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
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<IRouteProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
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
        display: string;
        sync: string;
        keep: boolean;
    };
    contextType?: React.Context<any>;
};
