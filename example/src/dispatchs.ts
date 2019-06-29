import { store } from './store';

export const addNumber = () => {
  store.updateState((state) => {
    state.user.info.num += 1;
  });
};

export const changeInfiniteIndex = (index: number) => {
  store.updateState((state) => {
    state.user.infinite[index] = Math.random().toString();
  });
};
