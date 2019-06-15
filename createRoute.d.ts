import * as React from 'react';
export interface IRouteProps {
    /**
     * children
     */
    children?: React.ReactNode;
    /**
     * 用于校验路由的路径
     */
    path: string;
}
/**
 * 使用状态管理简单模拟一个 react-router, 并且将router也接入状态管理中
 */
export declare function createRoute<S>(Consumer: any): ({ path, children }: IRouteProps) => JSX.Element;
