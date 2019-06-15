// import { createStateManagerAndRoute } from '@nuage/react-consumer/createStateManagerAndRoute';
import { createStateManagerAndRoute, IRouteState } from './lib/createStateManagerAndRoute';

// tslint:disable:completed-docs
export interface IState extends IRouteState {
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
