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
                isRenderChild: null;
                realChild: null;
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
            render(): JSX.Element | null;
            context: any;
            setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IRouteProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callBack?: (() => void) | undefined): void;
            readonly props: Readonly<IRouteProps> & Readonly<{
                children?: import("react").ReactNode;
            }>;
            refs: {
                [key: string]: import("react").ReactInstance;
            };
        };
        defaultProps: {
            sync: string;
            keep: boolean;
            animeTime: number;
        };
        contextType?: import("react").Context<any> | undefined;
    };
    routeMap: import("./createHistory").IHistory;
};
