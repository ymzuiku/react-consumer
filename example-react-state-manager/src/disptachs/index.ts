import { store } from '../store';

export function addNumber() {
  store.setState(state => {
    state.user.info.num += 1;
  });
}
