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

  if (path === '/') {
    window.history.replaceState(null, def, def);

    return [def];
  }
  const search = window.location.search;

  window.history.replaceState(null, def, def);
  window.history.pushState(null, path, path + search);

  return [def, path];
}

export interface IRouteState {
  route?: {
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

  const dispatchRoutePush = (path: string, params?: { [key: string]: any }) => {
    store.setState((state: any) => {
      state.route.paths.push(path);
      if (params) {
        state.route.params.push(params);
        if (typeof window !== 'undefined') {
          window.history.pushState(null, path, `${path}?${queryString.stringify(params)}`);
        }
      } else {
        if (typeof window !== 'undefined') {
          window.history.pushState(null, path, path);
        }
      }
    });
  };

  const dispatchRouteBack = () => {
    store.setState((state: any) => {
      window.history.back();
      state.route.paths.pop();
      state.route.params.pop();
    });
  };

  return { Provider, Consumer, store, Route, dispatchRoutePush, dispatchRouteBack };
}
