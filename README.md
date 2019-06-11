# React 状态管理之`温故知新`

旨在阐述清楚 声明式 的状态管理思路，以 React 作为例子，思路适用于所有 声明式 UI 的状态管理方案

使用 create-react-app 创建一个新的工程，我们会使用 react 原生的 api 轻松实现一个状态管理：

## 状态管理的配置

### 1. 按照依赖

```sh
yarn add @nuage/react-consumer
```

### 2. 实例化 store, Provider, Consumer

```js
import createStateManager from './utils/createStateManager';

// 一个多层级的对象示例，以验证immutable
const initState = {
  user: {
    info: {
      num: 0,
    },
  },
};

const { store, Provider, Consumer } = createStateManager(initState);

export { store, Provider, Consumer };
```

### 3. 在项目顶部注册 Provider

```js
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page';
import { Provider, Consumer } from './store';

function App() {
  return (
    <Provider>
      <Page />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## 状态管理的使用

### 1. 编写 dispatch

整个项目的状态管理代码，只有 dispatch, 我们只需要要编写 dispatch 即可。

action，reducer 都不需要编写，immutable 也不需要现示的编写，这一切都是自动的

整个项目的状态都编写在一个个 dispatch 中

```js
import { store } from './store';

export function dispatchOfAddNum() {
  // 在任何异步结束之后，处理状态更新
  store.setState(state => {
    // 此处执行区域是 immer 的更新函数，所以直接赋值即可，不需要返回整个 state
    state.user.info.num += 1;
  });
}
```

### 2. 在代码中使用状态和触发状态

```js
import React from 'react';
import * as dispatchs from './dispatchs';
import { Consumer } from './store';

function Page() {
  return (
    <div className="app">
      <p>最简单的例子</p>
      <Consumer>{state => <h2>{state.user.info.num}</h2>}</Consumer>
      <button onClick={dispatchs.dispatchOfAddNum}>点击仅重绘number</button>
    </div>
  );
}

export default Page;
```

## 单元测试

单元测试我们只需要覆盖 dispatch 的测试即可, dispatch 仅是一个个函数，测试起来非常简单：

```js
import { dispatchOfAddNum } from '../src/dispatchs';
import store from '../src/store';

test('add card', async () => {
  await dispatchOfAddNum(10);

  // 当函dispatch执行完成，我们检查一下store是否和我们预期的值一致即可
  expect(store.state.user.info.num).toBe(10);
});
```

我们可以在项目中运行 yarn test 验证以上测试
