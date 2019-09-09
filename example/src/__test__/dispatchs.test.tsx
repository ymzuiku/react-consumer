import { store } from '../controller';
import * as dispatchs from '../dispatchs';

it('test add', () => {
  dispatchs.addNumber();
  dispatchs.addNumber();
  dispatchs.addNumber();
  expect(store.getState().user.info.num).toBe(3);
});
