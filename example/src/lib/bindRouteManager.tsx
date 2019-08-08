import * as queryString from 'querystring-number';

import { createRoute, IRouteProps } from './_createRoute';

export interface IRouteState {
  paths: string[];
  status: any;
}

/**
 * 创建状态管理及路由控制
 */
export function bindRouteManager<S>(
  Consumer: any,
  store: any,
  // 是否使用 replace 代替 push，这样可以保持wechat的history为0
  isKeepHistory?: boolean
) {
  const Route = createRoute<S>(Consumer);

  type IRouteListenFn = (
    path: string,
    status: object | undefined,
    state: S
  ) => boolean;
  const routeListenFns: IRouteListenFn[] = [];

  /** 为route的变化添加监听，如果监听函数返回不是 true，则拦截此次的路由变化 */
  const routeListen = (fn: IRouteListenFn) => {
    routeListenFns.push(fn);
  };

  /** 校验路由变化是否被拦截 */
  const routeListenFnsChecker = (
    path: string,
    status?: { [key: string]: any }
  ) => {
    if (!path) {
      return true;
    }
    let isBlock = true;

    for (const fn of routeListenFns) {
      isBlock = fn(path, status, store.state);
      if (!isBlock) {
        break;
      }
    }

    return isBlock;
  };

  /**  替换当前路由状态 */
  const dispatchRouteReplace = (
    path: string,
    status?: { [key: string]: any }
  ) => {
    const realState = store.state;
    const thePath = path || realState.paths[realState.paths.length - 1];

    if (!routeListenFnsChecker(thePath, status)) {
      return;
    }

    store.update((state: any) => {
      const nextStatus = { ...state.status[path], ...status };
      state.status[path] = nextStatus;
      state.paths[state.paths.length - 1] = thePath;

      if (typeof window !== 'undefined') {
        window.history.replaceState(
          null,
          thePath,
          nextStatus ? `${path}?${queryString.stringify(nextStatus)}` : thePath
        );
      }
    });
  };

  /** 推进一个新的路由，并且更新 AppState */
  const dispatchRoutePush = (
    path: string,
    status?: { [key: string]: any },
    stopPush?: boolean
  ) => {
    if (!routeListenFnsChecker(path, status)) {
      return;
    }

    store.update((state: any) => {
      state.paths.push(path);
      const nextStatus = { ...state.status[path], ...status };
      state.status[path] = nextStatus;
      if (typeof window !== 'undefined' && !stopPush && !isKeepHistory) {
        window.history.pushState(
          null,
          path,
          nextStatus ? `${path}?${queryString.stringify(nextStatus)}` : path
        );
      }
    });
  };

  /** 移走一个路由或者去到指定路径的路由，并且更新视图 */
  const dispatchRoutePop = (index?: number | any, stopBack?: boolean) => {
    const realState = store.state;

    const _index =
      typeof index === 'number' ? index : realState.paths.length - 1;

    const path = realState.paths[_index - 1];
    const status = realState.status[path];

    if (!routeListenFnsChecker(path, status)) {
      return;
    }

    store.update((state: any) => {
      for (let i = 0; i < state.paths.length - _index; i++) {
        if (!stopBack) {
          window.history.back();
        }
        state.status[path] = {};
        state.paths.pop();
      }
    });
  };

  if (typeof window !== 'undefined') {
    const onPopState = () => {
      const realState = store.state;

      const paths = realState.paths;

      if (window.location.pathname !== paths[paths.length - 1]) {
        let isPop = false;
        paths.forEach((p: string, i: number) => {
          if (p === window.location.pathname) {
            isPop = true;
          }
        });
        if (isPop) {
          dispatchRoutePop(undefined, true);
        } else {
          const search = window.location.search;
          dispatchRoutePush(
            window.location.pathname,
            search === '' ? undefined : queryString.parse(search),
            true
          );
        }
      }
    };

    window.addEventListener('popstate', onPopState);
  }

  /** 根据浏览器访问的URL初始化路径 */
  function dispatchInitRoute(def: string) {
    store.update((s: any) => {
      s.paths = [...s.paths];
      s.status = { ...s.status };
    });

    if (typeof window === 'undefined') {
      return;
    }

    const path = window.location.pathname;
    const search = window.location.search;

    if (path === '/' || path === def) {
      dispatchRoutePush(def, search ? queryString.parse(search) : undefined);
    } else {
      dispatchRoutePush(def);
      dispatchRoutePush(path, search ? queryString.parse(search) : undefined);
    }
  }

  const dispatchRoute = {
    /** 重新初始化路由 */
    initRoute: dispatchInitRoute,
    /** 为route的变化添加监听，如果监听函数返回不是 true，则拦截此次的路由变化 */
    listen: routeListen,
    /** 移走一个路由或者去到指定路径的路由，并且更新视图 */
    pop: dispatchRoutePop,
    /** 推进一个新的路由，并且更新 AppState */
    push: dispatchRoutePush,
    /** 替换当前路由状态 */
    replace: dispatchRouteReplace,
  };

  // dispatchInitRoute(defaultPath);

  return { Route, dispatchRoute };
}
