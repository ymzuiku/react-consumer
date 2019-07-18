import { createStateManagerAndRoute } from './lib/createStateManagerAndRoute';

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

const { Consumer, store, Route, dispatchRoute } = createStateManagerAndRoute(initState);

export { Consumer, store, Route, dispatchRoute };

if (process.env.NODE_ENV === 'development') {
  const w = window as any;
  w.store = store;
}
