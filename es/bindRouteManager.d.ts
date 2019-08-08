/// <reference types="react" />
import { IRouteProps } from './_createRoute';
export interface IRouteState {
    paths: string[];
    status: any;
}
/**
 * 创建状态管理及路由控制
 */
export declare function bindRouteManager<S>(Consumer: any, store: any, isKeepHistory?: boolean): {
    Route: ({ style, path, keep, children, ...rest }: IRouteProps) => JSX.Element;
    dispatchRoute: {
        /** 重新初始化路由 */
        initRoute: (def: string) => void;
        /** 为route的变化添加监听，如果监听函数返回不是 true，则拦截此次的路由变化 */
        listen: (fn: (path: string, status: object, state: S) => boolean) => void;
        /** 移走一个路由或者去到指定路径的路由，并且更新视图 */
        pop: (index?: any, stopBack?: boolean) => void;
        /** 推进一个新的路由，并且更新 AppState */
        push: (path: string, status?: {
            [key: string]: any;
        }, stopPush?: boolean) => void;
        /** 替换当前路由状态 */
        replace: (path: string, status?: {
            [key: string]: any;
        }) => void;
    };
};
