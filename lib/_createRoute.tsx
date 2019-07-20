import * as React from 'react';

export interface IRouteProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /* children */
  children?: React.ReactNode;
  /* 如果历史路由中包含path，使用 div包裹子组件，并设置 dispatch=none 代替 return null */
  keep?: boolean;
  /* 用于校验路由的路径 */
  path: string;
}

/**
 * 使用状态管理简单模拟一个 react-router, 并且将router也接入状态管理中
 */
export function createRoute<S>(Consumer: any) {
  return function Route({ style, path, keep, children, ...rest }: IRouteProps) {
    return (
      <Consumer memo={(s: any) => [s.route.paths[s.route.paths.length - 1], s.route.paths]}>
        {([p, paths]: [string, string[]]) => {
          const nowPathList = p && p.split('/');
          const nextPathList = path && path.split('/');

          if (!nowPathList || !nextPathList) {
            return null;
          }

          let match = true;
          nowPathList.forEach((str: string, i: number) => {
            if (str !== nextPathList[i]) {
              match = false;
            }
          });

          if (match) {
            return (
              <div style={{ width: '100%', height: '100%', ...style }} {...rest}>
                {children}
              </div>
            );
          }

          if (keep) {
            let otherMatch = false;

            paths.forEach((otherPath) => {
              const otherPathList = otherPath.split('/');

              nowPathList.forEach((str: string, i: number) => {
                if (str === otherPathList[i]) {
                  otherMatch = true;
                }
              });
            });

            if (otherMatch === false) {
              return null;
            }

            return (
              <div style={{ display: !match ? 'none' : undefined, width: '100%', height: '100%', ...style }} {...rest}>
                {children}
              </div>
            );
          }

          return null;
        }}
      </Consumer>
    );
  };
}
