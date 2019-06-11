import * as React from 'react';

export const urlTools = {
  defaultPath: (def: string) => {
    return window.location.pathname === '/' ? def : window.location.pathname;
  },
  params: () => {
    return window.location.pathname.split('?')[1] && JSON.parse(window.location.pathname.split('?')[1]);
  },
  replace: (path: string, state: Object) => {
    if (state) {
      window.history.replaceState(null, path, path + '?' + JSON.stringify(state));
    } else {
      window.history.replaceState(null, path, path);
    }
  },
};

interface RouteProps {
  path: string;
  children: React.ReactNode;
}

interface IGet {
  (state: any): any;
}

// 使用状态管理简单模拟一个 react-router, 并且将router也接入状态管理中
function createRoute(Consumer: Function, pathGetter: IGet, paramsGetter: IGet) {
  return function Route({ path, children }: RouteProps) {
    return (
      <Consumer>
        {(state: Object) => {
          if (pathGetter(state) === path) {
            // 同步浏览器 url
            urlTools.replace(path, paramsGetter(state));
            return children;
          }
          return null;
        }}
      </Consumer>
    );
  };
}

export default createRoute;
