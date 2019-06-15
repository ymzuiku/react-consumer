import { createStateManagerAndRoute } from './lib/createStateManagerAndRoute';

// tslint:disable:completed-docs
export interface IState {
  route: {
    params: object[];
    paths: string[];
  };
  user: {
    infinite: string[];
    info: {
      num: number;
    };
  };
}

const infinite = [];
for (let i = 0; i < 50000; i++) {
  infinite.push(`data_${i}`);
}

const initState: IState = {
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

const { Provider, Consumer, store, Route, dispatchRoutePush, dispatchRouteBack } = createStateManagerAndRoute<IState>(
  initState,
  '/app',
);

export { Provider, Consumer, store, Route, dispatchRoutePush, dispatchRouteBack };

const w = window as any;
w.store = store;
