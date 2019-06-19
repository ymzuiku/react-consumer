/// <reference types="react" />
import { IRouteProps } from './createRoute';
import { IConsumerProps, IStore } from './createStateManager';
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
    Provider: import("react").FunctionComponent<{}>;
    Consumer: import("react").FunctionComponent<IConsumerProps<S>>;
    store: IStore<S>;
    Route: ({ path, children }: IRouteProps) => JSX.Element;
    dispatchRoute: {
        back: (index?: number) => void;
        listen: (fn: (path: string, param: object, state: S) => boolean) => void;
        push: (path: string, param?: {
            [key: string]: any;
        }) => void;
        replace: (param: {
            [key: string]: any;
        }) => void;
    };
};
