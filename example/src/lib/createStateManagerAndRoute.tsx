import * as queryString from 'query-string';

import { createRoute, IRouteProps } from './createRoute';
import { createStateManager, IConsumerProps, IStore } from './createStateManager';

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

  const { Provider, Consumer, store } = createStateManager<S>(initState);
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
  const dispatchRouteReplace = (param: { [key: string]: any }) => {
    if (!routeListenFnsChecker(param)) {
      return;
    }

    const realState = store.state as any;
    const path = realState.route.paths[realState.route.paths.length - 1];

    store.setState((state: any) => {
      state.route.params[state.route.params.length - 1] = param;

      if (typeof window !== 'undefined') {
        window.history.replaceState(null, path, `${path}?${queryString.stringify(param)}`);
      }
    });
  };

  /**
   * 推进一个新的路由，并且更新 AppState
   */
  const dispatchRoutePush = (path: string, param?: { [key: string]: any }) => {
    if (!routeListenFnsChecker(param)) {
      return;
    }

    store.setState((state: any) => {
      state.route.paths.push(path);
      if (param) {
        state.route.params.push(param);
        if (typeof window !== 'undefined') {
          window.history.pushState(null, path, `${path}?${queryString.stringify(param)}`);
        }
      } else {
        if (typeof window !== 'undefined') {
          window.history.pushState(null, path, path);
        }
      }
    });
  };

  /**
   * 移走一个路由或者去到指定路径的路由，并且更新视图
   */
  const dispatchRouteBack = (index?: number) => {
    const realState = store.state as any;

    let _index: number = index as any;
    if (typeof index !== 'number' || index === undefined) {
      _index = realState.route.params.length - 1;
    }
    _index = _index < 0 ? 0 : _index;

    const param = realState.route.params[_index];

    if (!routeListenFnsChecker(param)) {
      return;
    }

    store.setState((state: any) => {
      for (let i = 0; i < state.route.paths.length - _index; i++) {
        window.history.back();
        state.route.paths.pop();
        state.route.params.pop();
      }
    });
  };

  const dispatchRoute = {
    back: dispatchRouteBack,
    listen: routeListen,
    push: dispatchRoutePush,
    replace: dispatchRouteReplace,
  };

  return { Provider, Consumer, store, Route, dispatchRoute };
}
