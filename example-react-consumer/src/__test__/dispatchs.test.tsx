import * as dispatchs from '../dispatchs';
import { store } from '../store';

it('test add', () => {
  dispatchs.addNumber();
  dispatchs.addNumber();
  dispatchs.addNumber();
  expect(store.getState().user.info.num).toBe(3);
});
