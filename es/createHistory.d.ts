declare type IHistoryListenFn = (nextPath: string, historic: object | undefined, state: any) => void;
/** 根据浏览器访问的URL初始化路径 */
declare type IDispatchInitHistory = (def: string, keepHistory?: boolean, hashSpace?: string) => void;
export interface IHistory {
    /** 重新初始化路由 */
    init: IDispatchInitHistory;
    /** 获取某个path的状态 */
    checkPathMatch(path: string, paths: string[]): [boolean, boolean, number];
    /** 为history的变化添加监听 */
    listen(fn: IHistoryListenFn): void;
    /** 移走一个路由或者去到指定路径的路由，并且更新视图 */
    pop(index?: any, stopBack?: boolean): void;
    /** 推进一个新的路由，并且更新 AppState */
    push(path: string, historic?: {
        [key: string]: any;
    }, stopPush?: boolean): void;
    /** 替换当前路由状态 */
    replace(path: string, historic?: {
        [key: string]: any;
    }): void;
}
export declare const createHistory: (store: any) => IHistory;
export {};
