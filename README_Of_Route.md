我们都知道 redux 给我们带来一个可能就是`时间旅行`，`时间旅行`之所以可行是因为整个项目都被一个单一数据管理，我们只需要修改状态数据，整个应用就可以随时切换到相应的状态。

我们或许不需要`时间旅行`，但是我们需要让整个应用满足单一数据源，由一个状态管理。

我们如果要确保整个项目 UI 都由一个状态管理，相当于整个项目 UI 都抽象成无副作用的函数，那么还需要讲路由也纳入状态管理中。

我们可以使用 react-router, 使用 dispatch 为 history 封装一层，这样就可以很好的管理状态和路由。

为了简化开发，react-consumer 的 `bindRouteManager` 对象实现了一个迷你的路由(gzip 只有 4kb)，可以无缝将路由也接入状态管理，旨在给出一个路由关联的思路, 具体可以查看 `lib/bindRouteManager.tsx` 文件。

我们用刚刚的例子，修改实例化 store 的文件：

```tsx
import { createStateManager } from 'react-consumer/createStateManager';
import { bindRouteManager } from 'react-consumer/bindRouteManager';

const initState = {
  otherData: 'temp',
  // [注意] 需要添加 history:[], paths:[] 对象，我们约定使用 route 对象，用来记录路由状态
  history: {},
  paths: [],
};

const { Consumer, store } = createStateManager(initState);
// 使用Consumer，store 捆绑路由
const { Route, routeMap } = bindRouteManager(store);

// 将 Route 导出，在页面中使用
export { Consumer, store, Route, routeMap };
```

在任何一个页面使用路由, 只有当路径匹配时, 子组件才会渲染, 路由可以嵌套使用:

```js
import { Route, routeMap } from './store';

export default () => {
  React.useEffect(() => {
    // 根据URL初始化当前应该去到的页面
    routeMap.init('/app');
  }, []);

  return (
    <div>
      <Route path="/user" component={UserPage} />
      {/* 当页面不匹配时，不保持在路由栈中 */}
      <Route path="/user/login" component={Login} keep={false} />
      {/* loadTime = 0 加载时，才加载组件js文件  */}
      <Route
        path="/user/vip-page"
        component={() => import('./VipPage').then(v => v.default)}
        loadTime={0}
      />
      {/* loadTime = 2000 当首屏渲染结束后2000ms，自动开始异步加载组件js文件  */}
      <Route
        path="/user/pay-page"
        component={() => import('./PayPage').then(v => v.default)}
        loadTime={2000}
      />
    </div>
  );
};
```

切换路由, 也仅仅是几个预设好的 dispatch:

```js
import { routeMap } from './store';

// 推入一个路由
routeMap.push('/some-page', { name: 'dog' });

// 返回上一次的路由
routeMap.back();

// 返回首屏的路由
routeMap.back(0);

// 修改当前路由的编写
routeMap.replace('/some-page', { name: 100 });

// 监听路由的变化
routeMap.listen((path, params, state) => {
  // 如果返回的是false, 拦截此次路由的派发，不更新路由也不更新 AppState
  if (params.name > 50) {
    return false;
  }
  return true;
});
```

## 它和 react-router 的差异

### 一个显著的差异是，此路由是内部支持异步加载组件和预加载组件

我们设计了两种异步加载 js 代码的方式：

1. 当 `loadTime = 0` 时, 只有跳转到该路由时才会去下载路由相关代码
2. 当 `loadTime = 3000` 时, 等待 3000 毫秒，自动下载该路由相关代码，若在此之前该路由被激活，也会立刻下载路由相关代码。这个目的是为了规避跳转到异步路由的白屏问题。

```js
<Route
  path="/user/vip-page"
  component={() => import('./VipPage').then(v => v.default)}
  loadTime={0}
/>;

<Route
  path="/user/pay-page"
  component={() => import('./PayPage').then(v => v.default)}
  loadTime={1000}
/>;
```

### 另一个显著的差异是，此路由是**移动优先**的。

我们在移动端使用 react-router 时会有一个问题：当我们从子页面返回上一级页面时，上一级页面的状态、滚动高度等都重制了。

这是因为 react-router 只会渲染当前 path 匹配的组件。

此路由的区别是，我们会渲染上级、上上级等历史匹配的组件，它们都以 position: absolute 的方式存活在当前页面底部。当当前页面被推走时，上一级页面会被激活。

这样带来的优势是更适合移动端，它减少了 pop 上级页面时，重新绘制该页面的开销；也简化了我们管理重置上级页面状态的行为。

它相对于传统的方案会有些内存上的开销，但是带来的是更高的移动端的响应性能，这是值得的。而不需要的状态事件派发已被 react-consumer 拦截了，所以并不会有其他性能问题。

综合上所诉，我们请把每个 Route 的内部组件设置背景色，以防止不必要的查看到背景页面；并且保证每个页面是相对于浏览器窗口全屏的路由。

我们可以设置 `keep = false` 来取消此路由`移动优先`的策略

```js
<Route
  path="/user/vip-page"
  component={() => import('./VipPage').then(v => v.default)}
  keep={false}
/>
```

## End

返回[react-consumer 文档](./README.md)
