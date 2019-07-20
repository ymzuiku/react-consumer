# 此库是内部分享状态管理的一个产物

旨在阐述清楚 声明式 的状态管理思路，以 React 作为例子，思路适用于所有 声明式 UI 的状态管理方案

此版本的改动：

- 兼容低版本 React, 不依赖 context 和 hooks
- 使用发布订阅代替 context, 不需要 Provider, 从而更好的适应 React 插件的检查
- 强制需要描述 memo 对象, 这样的习惯可以让重绘控制在非常颗粒的 dom 元素
- (可选的)内置一个路由组件, 并且由状态管理管理好了路由及路由参数

## 状态管理的配置

### 1. 安装依赖

```sh
yarn add react-consumer
```

源码可以直接看此仓库的 `createStateManager.tsx` 文件，代码仅有几十行。

### 2. 实例化 store, Consumer

```js
import { createStateManager } from 'react-consumer';

// 一个多层级的对象示例，以验证immutable
const initState = {
  user: {
    info: {
      num: 0,
    },
  },
};

const { store, Consumer } = createStateManager(initState);

export { store, Consumer };
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
  store.updateState((state) => {
    // 此处执行区域是 immer 的更新函数，所以直接赋值即可，不需要返回整个 state
    state.user.info.num += 1;
  });
}
```

### 2. 在代码中使用状态和触发状态

Consumer API

| props         | 类型                      | 描述                                                                   |
| ------------- | ------------------------- | ---------------------------------------------------------------------- |
| memo          | `(state) => any[]`        | 返回一个数组对象, 只有当数组对象变更了, 才会更新组件                   |
| beforeUnmount | `(memo) => void`          | 当组件将要销毁之前的回调                                               |
| beforeUpdate  | `(memo) => void`          | 当组件将要更新之前的回调                                               |
| children      | `(memo) => React.Element` | Consumer 的子组件是一个函数(renderProps), 函数参数是 memo 对象和 state |

示例：

```js
import React from 'react';
import * as dispatchs from './dispatchs';
import { Consumer } from './store';

function Page() {
  return (
    <div className="app">
      <p>最简单的例子</p>
      <Consumer memo={(state) => [state.user.info.num]}>{([num]) => <h2>{num}</h2>}</Consumer>
      <button onClick={dispatchs.dispatchOfAddNum}>点击仅重绘number</button>
    </div>
  );
}

export default Page;
```

## 其他扩展

使用 react-consumer 的路由模块：[README_Of_Route](./README_Of_Route.md)

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
