import createStateManagerAndRoute from './lib/createStateManagerAndRoute';

interface State {
  route: {
    paths: Array<string>;
    params: Array<Object>;
  };
  user: {
    info: {
      num: number;
    };
  };
}

const initState: State = {
  route: {
    paths: [],
    params: [],
  },
  user: {
    info: {
      num: 0,
    },
  },
};

const { Provider, Consumer, store, Route, dispatchRoutePush, dispatchRouteBack } = createStateManagerAndRoute<State>(initState, '/app');

export { Provider, Consumer, store, Route, dispatchRoutePush, dispatchRouteBack };

const w = window as any;
w.store = store;
