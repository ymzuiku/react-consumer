/// <reference types="react" />
import { IHistory } from './createHistory';
export interface IRouteProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    component?: any;
    delay?: number;
    keep?: boolean;
    leaveTime?: number;
    path: string;
}
/**
 *  Route 使用 history.listen 而不使用 consumer 是因为 Route 属于非常固定的模式.
 *  Route 会常驻 ReactNode 对象树，使用 listen 可以有效减少不必要的 consumer 订阅。
 */
export declare function createRoute<S>(history: IHistory): {
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
