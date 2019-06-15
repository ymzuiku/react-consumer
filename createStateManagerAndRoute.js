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
exports.__esModule = true;
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
    if (path === '/') {
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
            paths: initPaths(defaultPath)
        }
    };
    initState = __assign({}, initState, routeState);
    var _a = createStateManager_1.createStateManager(initState), Provider = _a.Provider, Consumer = _a.Consumer, store = _a.store;
    var Route = createRoute_1.createRoute(Consumer);
    var dispatchRoutePush = function (path, params) {
        store.setState(function (state) {
            state.route.paths.push(path);
            if (params) {
                state.route.params.push(params);
                if (typeof window !== 'undefined') {
                    window.history.pushState(null, path, path + "?" + queryString.stringify(params));
                }
            }
            else {
                if (typeof window !== 'undefined') {
                    window.history.pushState(null, path, path);
                }
            }
        });
    };
    var dispatchRouteBack = function () {
        store.setState(function (state) {
            window.history.back();
            state.route.paths.pop();
            state.route.params.pop();
        });
    };
    return { Provider: Provider, Consumer: Consumer, store: store, Route: Route, dispatchRoutePush: dispatchRoutePush, dispatchRouteBack: dispatchRouteBack };
}
exports.createStateManagerAndRoute = createStateManagerAndRoute;
