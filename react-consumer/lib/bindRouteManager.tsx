import { createHistory } from './createHistory';

// tslint:disable-next-line
import { createRoute, IRouteProps } from './createRoute'; // eslint-disable-line

/**
 * 创建状态管理及路由控制
 */
export function bindRouteManager<S>(store: any) {
  const routeMap = createHistory(store);
  const Route = createRoute<S>(routeMap);

  return { Route, routeMap };
}
