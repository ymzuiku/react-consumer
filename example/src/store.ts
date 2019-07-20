import { bindRouteManager } from './lib/bindRouteManager';
import { createStateManager } from './lib/createStateManager';

const infinite = [];
for (let i = 0; i < 50000; i++) {
  infinite.push(`data_${i}`);
}

const initState = {
  route: {
    params: [],
    paths: [],
  },
  user: {
    infinite,
    info: {
      num: 0,
    },
  },
};

const { Consumer, store } = createStateManager(initState);
const { Route, dispatchRoute } = bindRouteManager(Consumer, store);

export { Consumer, store, Route, dispatchRoute };

if (process.env.NODE_ENV === 'development') {
  const w = window as any;
  w.store = store;
}
