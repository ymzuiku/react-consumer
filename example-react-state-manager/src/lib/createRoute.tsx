import * as React from 'react';

interface RouteProps {
  path: string;
  children?: React.ReactNode;
}

// 使用状态管理简单模拟一个 react-router, 并且将router也接入状态管理中
function createRoute<S>(Consumer: Function, checker: (state: S, path: string) => boolean) {
  return function Route({ path, children }: RouteProps) {
    return (
      <Consumer>
        {(state: S) => {
          if (checker(state, path)) {
            return children;
          }
          return null;
        }}
      </Consumer>
    );
  };
}

export default createRoute;
