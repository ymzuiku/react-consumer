import { bindRouteManager, createStateManager } from 'react-consumer';

// const { createStateManager, bindRouteManager } = ReactConsumer;

const infinite = [];
for (let i = 0; i < 50000; i++) {
  infinite.push(`data_${i}`);
}

const initState = {
  status: {
    '/App': {},
    '/InfiniteList': {},
    '/User': {},
  },
  paths: [],
  user: {
    infinite,
    info: {
      num: 0,
    },
  },
};

export type IState = typeof initState;

const { Consumer, store } = createStateManager(initState);
const { Route, routeMap } = bindRouteManager(store);

export { Consumer, store, Route, routeMap };

if (process.env.NODE_ENV === 'development') {
  const w = window as any;
  w.store = store;
}
