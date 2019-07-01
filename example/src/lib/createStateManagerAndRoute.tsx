import { createRoute, IRouteProps } from './createRoute';
import { createStateManager, IConsumerProps } from './createStateManager';
import { queryString } from './queryString';

/**
 * 根据浏览器访问的URL初始化路径
 */
function initPaths(def: string) {
  if (typeof window === 'undefined') {
    return ['/'];
  }

  const path = window.location.pathname;

  if (path === '/' || path === def) {
    window.history.replaceState(null, def, def);

    return [def];
  }

  const search = window.location.search;

  window.history.replaceState(null, def, def);
  window.history.pushState(null, path, path + search);

  return [def, path];
}

export interface IRouteState {
  route: {
    params: object[];
    paths: string[];
  };
}

/**
 * 创建状态管理及路由控制
 */
export function createStateManagerAndRoute<S>(initState: S, defaultPath: string = '/') {
  const routeState: IRouteState = {
    route: {
      params: [queryString.parse(window.location.search)],
      paths: initPaths(defaultPath),
    },
  };

  initState = {
    ...initState,
    ...routeState,
  };

  const { Consumer, store } = createStateManager<S>(initState);
  const Route = createRoute<S>(Consumer);

  type IRouteListenFn = (path: string, param: object | undefined, state: S) => boolean;
  const routeListenFns: IRouteListenFn[] = [];

  /**
   * 为route的变化添加监听，如果监听函数返回不是 true，则拦截此次的路由变化
   */
  const routeListen = (fn: IRouteListenFn) => {
    routeListenFns.push(fn);
  };

  const routeListenFnsChecker = (param?: { [key: string]: any }) => {
    let isBlock = true;
    const realState = store.state as any;
    const path = realState.route.paths[realState.route.paths.length - 1];

    for (const fn of routeListenFns) {
      isBlock = fn(path, param, store.state);
      if (isBlock) {
        break;
      }
    }

    return isBlock;
  };

  /**
   * 替换当前路由状态
   */
  const dispatchRouteReplace = (path: string | undefined, param?: { [key: string]: any }) => {
    if (!routeListenFnsChecker(param)) {
      return;
    }

    const realState = store.state as any;
    const thePath = path || realState.route.paths[realState.route.paths.length - 1];

    store.updateState((state: any) => {
      if (param) {
        state.route.params[state.route.params.length - 1] = param;
      }
      state.route.paths[state.route.paths.length - 1] = thePath;

      if (typeof window !== 'undefined') {
        window.history.replaceState(null, thePath, param ? `${path}?${queryString.stringify(param)}` : thePath);
      }
    });
  };

  /**
   * 推进一个新的路由，并且更新 AppState
   */
  const dispatchRoutePush = (path: string, param?: { [key: string]: any }, stopPush?: boolean) => {
    if (!routeListenFnsChecker(param)) {
      return;
    }

    store.updateState((state: any) => {
      state.route.paths.push(path);
      state.route.params.push(param || {});
      if (typeof window !== 'undefined' && !stopPush) {
        window.history.pushState(null, path, param ? `${path}?${queryString.stringify(param)}` : path);
      }
    });
  };

  /**
   * 移走一个路由或者去到指定路径的路由，并且更新视图
   */
  const dispatchRouteBack = (index?: number, stopBack?: boolean) => {
    const realState = store.state as any;

    const _index = index === undefined ? realState.route.paths.length - 1 : index;

    const param = realState.route.params[_index];

    if (!routeListenFnsChecker(param)) {
      return;
    }

    store.updateState((state: any) => {
      for (let i = 0; i < state.route.paths.length - _index; i++) {
        if (!stopBack) {
          window.history.back();
        }
        state.route.paths.pop();
        state.route.params.pop();
      }
    });
  };

  if (typeof window !== 'undefined') {
    const onPopState = () => {
      const realState = store.state as any;

      const paths = realState.route.paths;

      if (window.location.pathname !== paths[paths.length - 1]) {
        let isPop = false;
        paths.forEach((p: string, i: number) => {
          if (p === window.location.pathname) {
            isPop = true;
          }
        });
        if (isPop) {
          dispatchRouteBack(undefined, true);
        } else {
          const search = window.location.search;
          dispatchRoutePush(window.location.pathname, search === '' ? undefined : queryString.parse(search), true);
        }
      }
    };

    window.addEventListener('popstate', onPopState);
  }

  const dispatchRoute = {
    /**
     * 移走一个路由或者去到指定路径的路由，并且更新视图
     */
    back: dispatchRouteBack,
    /**
     * 为route的变化添加监听，如果监听函数返回不是 true，则拦截此次的路由变化
     */
    listen: routeListen,
    /**
     * 推进一个新的路由，并且更新 AppState
     */
    push: dispatchRoutePush,
    /**
     * 替换当前路由状态
     */
    replace: dispatchRouteReplace,
  };

  return { Consumer, store, Route, dispatchRoute };
}
