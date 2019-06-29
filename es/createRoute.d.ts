import * as React from 'react';
export interface IRouteProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: React.ReactNode;
    keep?: boolean;
    path: string;
}
/**
 * 使用状态管理简单模拟一个 react-router, 并且将router也接入状态管理中
 */
export declare function createRoute<S>(Consumer: any): ({ style, path, keep, children, ...rest }: IRouteProps) => JSX.Element;
