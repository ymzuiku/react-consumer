declare type IHistoryListenFn = (nextPath: string, historic: object | undefined, state: any) => void;
/** 根据浏览器访问的URL初始化路径 */
declare type IDispatchInitHistory = (def: string, keepHistory?: boolean, hashSpace?: string) => void;
export interface IHistory {
    /** 重新初始化路由 */
    init: IDispatchInitHistory;
    /** 获取某个path的状态 [是否当前页，是否在栈中，是否次页，栈的编号] */
    checkUrlMatch(path: string): {
        index: number;
        lastPage: boolean;
        match: boolean;
        stackMatch: boolean;
    };
    checkUrlsStaskTop(path: string, paths: string[]): boolean;
    /** 为history的变化添加监听, 返回值是注销函数 */
    listen(fn: IHistoryListenFn): () => any;
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
