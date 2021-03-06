# 满足声明式、单一状态源的前提下，控制重绘的颗粒度

**请使用作者另一个库：react-ob ，更简约**

> 旨在阐述清楚 声明式 的状态管理思路，以 React 作为例子，思路适用于所有 声明式 UI 的状态管理方案

只监听不可变对象有差异时，对颗粒 React 节点进行更新的状态管理方案，使用 redux 一样的思路，它是声明式的、单一数据源的

整个状态管理方案的思路请查阅 Keynote: [React 状态管理之温故知新.key](./React状态管理之温故知新.key)

这个 Keynote 是内部演讲的产物，每一页均有注释，请激活 Keynote 的演讲注释搞即可查看。

## 状态管理的配置

### 1. 安装依赖

```sh
yarn add react-consumer
```

源码可以直接看此仓库的 `createStateManager.tsx` 文件，代码仅有几十行。

### 2. 实例化 store, Consumer

```js
import ReactConsumer from 'react-consumer';
import produce from 'immer';

// 一个多层级的对象示例，以验证immutable
const initState = {
  user: {
    info: {
      num: 0,
    },
  },
};

// 可选编写更新处理方法，这里默认如下：使用 immer 来使用不可变对象
const updater = (state, event) => {
  return produce(state, draft => {
    event(draft);
  });
};

const { store, Consumer } = ReactConsumer.createStateManager(initState, updater);

// 以上代码相当于：
// const { store, Consumer } = ReactConsumer.createStateManager(initState);

export { store, Consumer };
```

## 状态管理的使用

### 1. 编写 action

整个项目的状态管理代码，只有 action, 我们只需要要编写 action 即可。

```js
import { store } from './store';

export function actionOfAddNum() {
  // 在任何异步结束之后，处理状态更新
  store.update(state => {
    // 此处执行区域是 immer 的更新函数，所以直接赋值即可，不需要返回整个 state
    state.user.info.num += 1;
  });
}
```

### 2. 在代码中使用状态和触发状态

Consumer API

| props     | 类型                                   | 描述                                                                              |
| --------- | -------------------------------------- | --------------------------------------------------------------------------------- |
| subscribe | `(state) => any[]`                     | 返回一个数组对象, 只有当数组对象变更了, 才会更新组件                              |
| memo      | `any[]`                                | 组件内部拦截了更新派发，若有非 subscribe 之外的上下文依赖更新，需要声明在 memo 中 |
| onMount   | `(...subscribeDatas) => void`          | 当组件 onMount 时的回调                                                           |
| onUnmount | `(...subscribeDatas) => void`          | 当组件将要销毁之前的回调                                                          |
| onUpdate  | `(...subscribeDatas) => void`          | 当组件将要更新之前的回调                                                          |
| children  | `(...subscribeDatas) => React.Element` | Consumer 的子组件是一个函数(renderProps), 函数参数是 memo 对象和 state            |

示例：

```js
import React from 'react';
import * as actions from './actions';
import { Consumer } from './store';

function Page() {
  return (
    <div className="app">
      <p>最简单的例子</p>
      <Consumer subscribe={state => [state.user.info.num]}>{num => <h2>{num}</h2>}</Consumer>
      <button onClick={actions.actionOfAddNum}>点击仅重绘number</button>
    </div>
  );
}

export default Page;
```

## 扩展阅读

我们都知道 redux 给我们带来一个可能就是`时间旅行`，`时间旅行`之所以可行是因为整个项目都被一个单一数据管理，我们只需要修改状态数据，整个应用就可以随时切换到相应的状态。

我们或许不需要`时间旅行`，但是我们需要让整个应用满足单一数据源，由一个状态管理。

我们如果要确保整个项目 UI 都由一个状态管理，相当于整个项目 UI 都抽象成无副作用的函数，那么还需要讲路由也纳入状态管理中。

我们可以使用 react-router, 使用 action 为 history 封装一层，这样就可以很好的管理状态和路由。

`react-consumer` 内置了一个路由扩展模块，它帮我们无缝实现了以上功能，它非常接近 react-route，但是有些许不一样。具体可以查看：

[使用 react-consumer 的路由扩展模块](./README_Of_Route.md)

## 单元测试

单元测试我们只需要覆盖 actions 的测试即可, actions 仅是一个个函数，测试起来非常简单：

```js
import { actionOfAddNum } from '../src/actions';
import { store } from '../src/store';

test('add card', async () => {
  await actionOfAddNum(10);

  // 当函 action 执行完成，我们检查一下 store 是否和我们预期的值一致即可
  expect(store.getState().user.info.num).toBe(10);
});
```

我们可以在项目中运行 yarn test 验证以上测试
