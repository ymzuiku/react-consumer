import createReactConsumer from './createStateManager';
import createRoute from './createRoute';
import * as queryString from 'query-string';

function initPaths(def: string) {
  const path = window.location.pathname;

  if (path === '/') {
    window.history.replaceState(null, def, def);
    return [def];
  } else {
    const search = window.location.search;

    window.history.replaceState(null, def, def);
    window.history.pushState(null, path, path + search);
    return [def, path];
  }
}

function createStateManagerAndRoute<S>(initState: S, defaultPath: string) {
  const routeState = {
    route: {
      paths: initPaths('/app'),
      params: [queryString.parse(window.location.search)],
    },
  };

  initState = {
    ...initState,
    ...routeState,
  };

  const { Provider, Consumer, store } = createReactConsumer<S>(initState);
  const Route = createRoute(Consumer, (state: any, path) => state.route.paths[state.route.paths.length - 1] === path);

  function dispatchRoutePush(path: string, params?: Object) {
    store.setState((state: any) => {
      state.route.paths.push(path);
      if (params) {
        state.route.params.push(params);
        window.history.pushState(null, path, path + '?' + queryString.stringify(params));
      } else {
        window.history.pushState(null, path, path);
      }
    });
  }

  function dispatchRouteBack() {
    store.setState((state: any) => {
      state.route.paths.pop();
      state.route.params.pop();
      window.history.back();
    });
  }

  return { Provider, Consumer, store, Route, dispatchRoutePush, dispatchRouteBack };
}

export default createStateManagerAndRoute;
