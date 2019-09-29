import { store } from './store';

export const addNumber = () => {
  store.update(state => {
    state.user.info.num += 1;
  });
};

export const changeInfiniteIndex = (index: number) => {
  store.update(state => {
    state.user.infinite[index] = Math.random().toString();
  });
};
