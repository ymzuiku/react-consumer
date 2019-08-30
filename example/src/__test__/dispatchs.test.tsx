import { store } from '../controller';
import * as dispatchs from '../dispatchs';

it('test add', () => {
  dispatchs.addNumber();
  dispatchs.addNumber();
  dispatchs.addNumber();
  expect(store.state.user.info.num).toBe(3);
});
