"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var queryString = require("query-string");
var createRoute_1 = require("./createRoute");
var createStateManager_1 = require("./createStateManager");
/**
 * 根据浏览器访问的URL初始化路径
 */
function initPaths(def) {
    if (typeof window === 'undefined') {
        return ['/'];
    }
    var path = window.location.pathname;
    if (path === '/' || path === def) {
        window.history.replaceState(null, def, def);
        return [def];
    }
    var search = window.location.search;
    window.history.replaceState(null, def, def);
    window.history.pushState(null, path, path + search);
    return [def, path];
}
/**
 * 创建状态管理及路由控制
 */
function createStateManagerAndRoute(initState, defaultPath) {
    if (defaultPath === void 0) { defaultPath = '/'; }
    var routeState = {
        route: {
            params: [queryString.parse(window.location.search)],
            paths: initPaths(defaultPath),
        },
    };
    initState = __assign({}, initState, routeState);
    var _a = createStateManager_1.createStateManager(initState), Provider = _a.Provider, Consumer = _a.Consumer, store = _a.store;
    var Route = createRoute_1.createRoute(Consumer);
    var routeListenFns = [];
    /**
     * 为route的变化添加监听，如果监听函数返回不是 true，则拦截此次的路由变化
     */
    var routeListen = function (fn) {
        routeListenFns.push(fn);
    };
    var routeListenFnsChecker = function (param) {
        var isBlock = true;
        var realState = store.state;
        var path = realState.route.paths[realState.route.paths.length - 1];
        for (var _i = 0, routeListenFns_1 = routeListenFns; _i < routeListenFns_1.length; _i++) {
            var fn = routeListenFns_1[_i];
            isBlock = fn(path, param, store.state);
            if (isBlock) {
                break;
            }
        }
        return isBlock;
    };
    /**
     * 替换当前路由状态
     */
    var dispatchRouteReplace = function (param) {
        if (!routeListenFnsChecker(param)) {
            return;
        }
        var realState = store.state;
        var path = realState.route.paths[realState.route.paths.length - 1];
        store.setState(function (state) {
            state.route.params[state.route.params.length - 1] = param;
            if (typeof window !== 'undefined') {
                window.history.replaceState(null, path, path + "?" + queryString.stringify(param));
            }
        });
    };
    /**
     * 推进一个新的路由，并且更新 AppState
     */
    var dispatchRoutePush = function (path, param) {
        if (!routeListenFnsChecker(param)) {
            return;
        }
        store.setState(function (state) {
            state.route.paths.push(path);
            if (param) {
                state.route.params.push(param);
                if (typeof window !== 'undefined') {
                    window.history.pushState(null, path, path + "?" + queryString.stringify(param));
                }
            }
            else {
                if (typeof window !== 'undefined') {
                    window.history.pushState(null, path, path);
                }
            }
        });
    };
    /**
     * 移走一个路由或者去到指定路径的路由，并且更新视图
     */
    var dispatchRouteBack = function (index) {
        var realState = store.state;
        var _index = index;
        if (typeof index !== 'number' || index === undefined) {
            _index = realState.route.params.length - 1;
        }
        _index = _index < 0 ? 0 : _index;
        var param = realState.route.params[_index];
        if (!routeListenFnsChecker(param)) {
            return;
        }
        store.setState(function (state) {
            for (var i = 0; i < state.route.paths.length - _index; i++) {
                window.history.back();
                state.route.paths.pop();
                state.route.params.pop();
            }
        });
    };
    var dispatchRoute = {
        back: dispatchRouteBack,
        listen: routeListen,
        push: dispatchRoutePush,
        replace: dispatchRouteReplace,
    };
    return { Provider: Provider, Consumer: Consumer, store: store, Route: Route, dispatchRoute: dispatchRoute };
}
exports.createStateManagerAndRoute = createStateManagerAndRoute;
