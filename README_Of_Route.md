路由最好使用 react-router, 使用 dispatch 为 history 封装一层，这样就可以很好的管理状态和路由。

本组件内部 `createStateManagerAndRoute` 对象内部实现了一个迷你的路由，可以无缝将路由也接入状态管理，旨在给出一个路由关联的思路, 具体可以查看 `example/lib/createStateManagerAndRoute.tsx` 文件。

我们用刚刚的例子，修改实例化 store 的文件：

```tsx
import { createStateManager } from 'react-consumer/createStateManager';
import { bindRouteManager } from 'react-consumer/bindRouteManager';

const initState = {
  otherData: 'temp',
  // [注意] 需要添加 route:{params:[], paths:[]} 对象，我们约定使用 route 对象，用来记录路由状态
  route: {
    params: [],
    paths: [],
  },
};

const { Consumer, store } = createStateManager(initState);
// 使用Consumer，store 捆绑路由
const { Route, dispatchRoute } = bindRouteManager(Consumer, store);

// 将 Route 导出，在页面中使用
export { Consumer, store, Route, dispatchRoute };
```

在任何一个页面使用路由, 只有当路径匹配时, 子组件才会渲染, 路由可以嵌套使用:

```js
import { Route } from './store';

export default () => {
  React.useEffect(() => {
    // 根据URL初始化当前应该去到的页面
    dispatchRoute.initRoute('/app');
  }, []);

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

切换路由, 也仅仅是几个预设好的 dispatch:

```js
import { dispatchRoute } from './store';

// 推入一个路由
dispatchRoute.push('/some-page', { name: 'dog' });

// 返回上一次的路由
dispatchRoute.back();

// 返回首屏的路由
dispatchRoute.back(0);

// 修改当前路由的编写
dispatchRoute.replace({ name: 100 });

// 监听路由的变化
dispatchRoute.listen((path, params, state) => {
  // 如果返回的是false, 拦截此次路由的派发，不更新路由也不更新 AppState
  if (params.name > 50) {
    return false;
  }
  return true;
});
```