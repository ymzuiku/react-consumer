import { bindRouteManager } from 'react-consumer/bindRouteManager';
import { createStateManager } from 'react-consumer/createStateManager';

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

const { Consumer, store } = createStateManager(initState);
const { Route, history } = bindRouteManager(store);

export { Consumer, store, Route, history };

if (process.env.NODE_ENV === 'development') {
  const w = window as any;
  w.store = store;
}
