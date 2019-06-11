import { store } from './store';

export function addNumber() {
  store.setState(state => {
    state.user.info.num += 1;
  });
}

export function routePush(url: string) {
  store.setState(state => {
    state.route.path = url;
  });
}
