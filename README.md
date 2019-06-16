# 此库是内部分享状态管理的一个产物

旨在阐述清楚 声明式 的状态管理思路，以 React 作为例子，思路适用于所有 声明式 UI 的状态管理方案

使用 create-react-app 创建一个新的工程，我们会使用 react 原生的 api 轻松实现一个状态管理：

## 状态管理的配置

### 1. 安装依赖

```sh
yarn add react-consumer
```

源码可以直接看此仓库的 `createStateManager.tsx` 文件，代码仅有几十行。

### 2. 实例化 store, Provider, Consumer

```js
import { createStateManager } from 'react-consumer/createStateManager';

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

## 路由

路由最好使用 react-router, 使用 dispatch 为 history 封装一层，这样就可以很好的管理状态和路由。

`createStateManagerAndRoute` 对象内部实现了一个迷你的路由，可以无缝将路由也接入状态管理，旨在给出一个路由关联的思路, 具体可以查看 `example/lib/createStateManagerAndRoute.tsx` 文件。

我们用刚刚的例子，修改实例化 store 的文件：

```tsx
import { createStateManagerAndRoute, IRouteState } from 'react-consumer/createStateManagerAndRoute';

// [注意] 需要添加route对象，我们约定使用 route 对象，用来记录路由状态
interface State extends IRouteState {}

// 一个多层级的对象示例，以验证immutable
const initState: State = {};

const { Provider, Consumer, store, Route, dispatchRoutePush, dispatchRouteBack } = createStateManagerAndRoute<State>(
  initState,
  '/app',
);

// 创建一个路由组件，捆绑 Consumer 和 path，params 的状态获取方法
const Route = createRoute(Consumer, (v: State) => v.route.path, (v: State) => v.route.params);

// 将 Route 导出，在页面中使用
export { Provider, Consumer, store, Route, dispatchRoutePush, dispatchRouteBack };
```

在任何一个页面使用路由, 只有当路径匹配时, 子组件才会渲染, 路由可以嵌套使用:

```js
import { Route } from './store';

export default () => {
  return (
    <Route path="/user">
      <UserPage />
      <Route path="/user/login">
        <Login />
      </Route>
    </Route>
  );
};
```

切换路由, 也仅仅是两个预设好的 dispatch:

```js
import { dispatchRoutePush, dispatchRouteBack } from './store';

// 推入一个路由
dispatchRoutePush('/some-page', { name: 'dog' });

// 返回上一次的路由
dispatchRouteBack();
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
