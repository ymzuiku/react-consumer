import * as React from 'react';

export interface IRouteProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /* children */
  children?: React.ReactNode;
  /* 如果历史路由中包含path，使用 div包裹子组件，并设置 dispatch=none 代替 return null */
  keep?: boolean;
  /* 用于校验路由的路径 */
  path: string;
}

const cacheGetMatch = new Map();

const getMatch = (selfPath: string, nextPath: string) => {
  const key = selfPath + nextPath;

  if (cacheGetMatch.has(key)) {
    return cacheGetMatch.get(key);
  }
  const selfPathList = selfPath && selfPath.split('/');
  const nextPathList = nextPath && nextPath.split('/');
  if (!nextPathList || !selfPathList) {
    cacheGetMatch.set(key, false);

    return false;
  }

  let match = true;
  selfPathList.forEach((str: string, i: number) => {
    if (str !== '*' && str !== nextPathList[i]) {
      match = false;
    }
  });

  cacheGetMatch.set(key, match);

  return match;
};

/**
 * 使用状态管理简单模拟一个 react-router, 并且将router也接入状态管理中
 */
export function createRoute<S>(Consumer: any) {
  return function Route({ style, path, keep, children, ...rest }: IRouteProps) {
    return (
      <Consumer memo={(s: any) => [s.paths[s.paths.length - 1], s.paths]}>
        {([nextPath, paths]: [string, string[]]) => {
          const match = getMatch(path, nextPath);

          if (match && !keep) {
            return (
              <div
                about={path}
                style={{ width: '100%', height: '100%', ...style }}
                {...rest}
              >
                {children}
              </div>
            );
          }

          if (keep) {
            let otherMatch = false;

            // 计算历史路径是否有匹配
            paths.forEach(otherPath => {
              const subMatch = getMatch(path, otherPath);
              if (subMatch) {
                otherMatch = true;
              }
            });

            if (otherMatch === false) {
              return null;
            }

            return (
              <div
                about={path}
                style={{
                  display: !match ? 'none' : undefined,
                  width: '100%',
                  height: '100%',
                  ...style,
                }}
                {...rest}
              >
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
