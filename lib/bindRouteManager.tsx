import { createHistory } from './createHistory';

// tslint:disable-next-line
import { createRoute, IRouteProps } from './createRoute'; // eslint-disable-line

/**
 * 创建状态管理及路由控制
 */
export function bindRouteManager<S>(store: any) {
  const history = createHistory(store);
  const Route = createRoute<S>(store, history);

  return { Route, history };
}
