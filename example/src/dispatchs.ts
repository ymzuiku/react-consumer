import { dispatchRouteBack, dispatchRoutePush, IState, store } from './store';

export const addNumber = () => {
  store.setState((state: IState) => {
    state.user.info.num += 1;
  });
};

export const changeInfiniteIndex = (index: number) => {
  store.setState((state: IState) => {
    state.user.infinite[index] = Math.random().toString();
  });
};

export const routePush = (path: string, params?: object) => {
  dispatchRoutePush(path, params);
};

export const routeBack = () => {
  dispatchRouteBack();
};
