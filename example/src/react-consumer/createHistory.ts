import * as queryString from 'querystring-number';

type IHistoryListenFn = (nextPath: string, historic: object | undefined, state: any) => void;

/** 根据浏览器访问的URL初始化路径 */
type IDispatchInitHistory = (def: string, keepHistory?: boolean, hashSpace?: string) => void;

export interface IHistory {
  /** 重新初始化路由 */
  init: IDispatchInitHistory;
  /** 获取某个path的状态 [是否当前页，是否在栈中，是否次页，栈的编号] */
  checkUrlMatch(
    path: string
  ): {
    index: number;
    lastPage: boolean;
    match: boolean;
    stackMatch: boolean;
  };
  checkUrlsStaskTop(path: string, paths: string[]): boolean;
  /** 为history的变化添加监听, 返回值是注销函数 */
  listen(fn: IHistoryListenFn): () => any;
  /** 移走一个路由或者去到指定路径的路由，并且更新视图 */
  pop(index?: any, stopBack?: boolean): void;
  /** 推进一个新的路由，并且更新 AppState */
  push(
    path: string,
    historic?: {
      [key: string]: any;
    },
    stopPush?: boolean
  ): void;
  /** 替换当前路由状态 */
  replace(
    path: string,
    historic?: {
      [key: string]: any;
    }
  ): void;
}

export const createHistory = (store: any): IHistory => {
  const cacheGetMatch = new Map();

  const getMatch = (selfPath: string, nextPath: string): boolean => {
    const key = selfPath + nextPath;

    if (cacheGetMatch.has(key)) {
      return cacheGetMatch.get(key);
    }
    const selfPathList = selfPath && selfPath.split('/');
    const nextPathList = nextPath && nextPath.split('/');
    if (!nextPathList || !selfPathList) {
      cacheGetMatch.set(key, false);

      return false;
    }

    let match = true;
    selfPathList.forEach((str: string, i: number) => {
      if (str !== '*' && str !== nextPathList[i]) {
        match = false;
      }
    });

    cacheGetMatch.set(key, match);

    return match;
  };

  const checkUrlMatch = (
    path: string
  ): {
    index: number;
    lastPage: boolean;
    match: boolean;
    stackMatch: boolean;
  } => {
    const paths = store.getState().paths;
    let stackMatch = false;
    let index = -1;

    // 计算历史路径是否有匹配
    for (let i = paths.length - 1; i >= 0; i--) {
      const subMatch = getMatch(path, paths[i]);
      if (subMatch) {
        index = i;
        stackMatch = true;
        break;
      }
    }

    const match = getMatch(path, paths[paths.length - 1]);
    const lastPage = getMatch(path, paths[paths.length - 2]);

    return {
      match,
      stackMatch,
      lastPage,
      index,
    };
  };

  const checkUrlsStaskTop = (path: string, paths: string[]): boolean => {
    const index = checkUrlMatch(path).index;
    const indexs = paths.map(v => {
      return checkUrlMatch(v).index;
    });
    const sorts = [...indexs].sort((a, b) => b - a);

    return index === sorts[0];
  };

  let space = '';
  let isKeepHistory = false;

  const getHref = () => {
    if (window.location.hash.length > 0) {
      const [pathname, search = ''] = window.location.hash.split('?');

      const path = pathname.replace(space, '');

      return [path, search];
    }

    return [window.location.pathname, window.location.search || ''];
  };

  const historyListenFns = new Set<IHistoryListenFn>();

  /** 为history的变化添加监听，如果监听函数返回不是 true，则拦截此次的路由变化 */
  const historyListen = (fn: IHistoryListenFn) => {
    historyListenFns.add(fn);

    return () => {
      historyListenFns.delete(fn);
    };
  };

  /** 校验路由变化是否被拦截 */
  const historyListenFnsChecker = (nextPath: string, historic?: { [key: string]: any }) => {
    historyListenFns.forEach(fn => {
      fn(nextPath, historic, store.getState());
    });
  };

  /**  替换当前路由状态 */
  const dispatcHistoryReplace = (path: string, historic?: { [key: string]: any }) => {
    const realState = store.getState();
    const thePath = path || realState.paths[realState.paths.length - 1];

    store.update((state: any) => {
      const nextHistoric = { ...state.history[path], ...historic };
      state.history[path] = nextHistoric;
      state.paths[state.paths.length - 1] = thePath;

      if (typeof window !== 'undefined') {
        const query = queryString.stringify(nextHistoric);

        window.history.replaceState(null, `${space}${thePath}`, query === '' ? `${space}${thePath}` : `${space}${thePath}?${query}`);
      }
    });

    historyListenFnsChecker(thePath, historic);
  };

  /** 推进一个新的路由，并且更新 AppState */
  const dispatchHistoryPush = (path: string, historic?: { [key: string]: any }, stopPush?: boolean) => {
    if (path === store.getState().paths[store.getState().paths.length - 1]) {
      return;
    }
    store.update((state: any) => {
      state.paths.push(path);
      const nextHistoric = { ...state.history[path], ...historic };
      state.history[path] = nextHistoric;
      if (typeof window !== 'undefined' && !stopPush && !isKeepHistory) {
        const query = queryString.stringify(nextHistoric);
        window.history.pushState(null, `${space}${path}`, query === '' ? `${space}${path}` : `${space}${path}?${query}`);
      }
    });

    historyListenFnsChecker(path, historic);
  };

  /** 移走一个路由或者去到指定路径的路由，并且更新视图 */
  const dispatchHistoryPop = (index?: number | any, stopBack?: boolean) => {
    const realState = store.getState();

    const _index = typeof index === 'number' ? index : realState.paths.length - 1;

    const path = realState.paths[_index - 1];
    const historic = realState.history[path];

    store.update((state: any) => {
      for (let i = 0; i < state.paths.length - _index; i++) {
        if (!stopBack) {
          window.history.back();
        }
        state.history[realState.paths[_index]] = {};
        state.paths.pop();
      }
    });

    historyListenFnsChecker(path, historic);
  };

  if (typeof window !== 'undefined') {
    const onPopState = () => {
      const realState = store.getState();

      const paths = realState.paths;

      if (getHref()[0] !== paths[paths.length - 1]) {
        let isPop = false;
        paths.forEach((p: string, i: number) => {
          if (p === getHref()[0]) {
            isPop = true;
          }
        });
        if (isPop) {
          dispatchHistoryPop(undefined, true);
        } else {
          const [path, search] = getHref();
          dispatchHistoryPush(path, search !== '' ? queryString.parse(search) : undefined, true);
        }
      } else {
        historyListenFnsChecker(getHref()[0], undefined);
      }
    };

    window.addEventListener('popstate', onPopState);
  }

  /** 根据浏览器访问的URL初始化路径 */
  function dispatchInitHistory(def: string, keepHistory?: boolean, hashSpace = '#') {
    isKeepHistory = keepHistory || false;

    space = hashSpace;

    store.update((s: any) => {
      s.paths = [];
      s.history = { ...s.history };
    });

    if (typeof window === 'undefined') {
      return;
    }

    const [path, search] = getHref();

    if (path === '/' || path === def) {
      dispatchHistoryPush(def, queryString.parse(search));
    } else {
      dispatchHistoryPush(def);
      setTimeout(() => {
        dispatchHistoryPush(path, queryString.parse(search));
      });
    }
  }

  return {
    /** 获取某个path的状态 */
    checkUrlMatch,
    /** 计算多个url，得到相对的 stackTop */
    checkUrlsStaskTop,
    /** 重新初始化路由 */
    init: dispatchInitHistory,
    /** 为history的变化添加监听 */
    listen: historyListen,
    /** 移走一个路由或者去到指定路径的路由，并且更新视图 */
    pop: dispatchHistoryPop,
    /** 推进一个新的路由，并且更新 AppState */
    push: dispatchHistoryPush,
    /** 替换当前路由状态 */
    replace: dispatcHistoryReplace,
  };
};
