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
export function createRoute<S>(Consumer: any) {
  return function Route({ path, children }: IRouteProps) {
    return (
      <Consumer>
        {(state: S) => {
          const s = state as any;
          if (s.route.paths[s.route.paths.length - 1].indexOf(path) === 0) {
            return children;
          }

          return null;
        }}
      </Consumer>
    );
  };
}
