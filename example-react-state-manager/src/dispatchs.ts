import { store, dispatchRouteBack, dispatchRoutePush } from './store';

export function addNumber() {
  store.setState(state => {
    state.user.info.num += 1;
  });
}

export function routePush(path: string, params?: Object) {
  dispatchRoutePush(path, params);
}

export function routeBack() {
  dispatchRouteBack();
}
