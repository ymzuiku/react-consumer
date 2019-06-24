import { store } from './store';

export const addNumber = () => {
  store.setState(state => {
    state.user.info.num += 1;
  });
};

export const changeInfiniteIndex = (index: number) => {
  store.setState(state => {
    state.user.infinite[index] = Math.random().toString();
  });
};
