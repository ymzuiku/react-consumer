import { IRouteProps } from './createRoute';
import { IConsumerProps, IStore } from './createStateManager';
/**
 * 创建状态管理及路由控制
 */
export declare function createStateManagerAndRoute<S>(initState: S, defaultPath?: string): {
    Provider: import("react").FunctionComponent<{}>;
    Consumer: import("react").FunctionComponent<IConsumerProps<S>>;
    store: IStore<S>;
    Route: ({ path, children }: IRouteProps) => JSX.Element;
    dispatchRoutePush: (path: string, params?: {
        [key: string]: any;
    }) => void;
    dispatchRouteBack: () => void;
};
