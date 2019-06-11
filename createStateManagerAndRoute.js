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
var createStateManager_1 = require("./createStateManager");
var createRoute_1 = require("./createRoute");
var queryString = require("query-string");
function initPaths(def) {
    var path = window.location.pathname;
    if (path === '/') {
        window.history.replaceState(null, def, def);
        return [def];
    }
    else {
        var search = window.location.search;
        window.history.replaceState(null, def, def);
        window.history.pushState(null, path, path + search);
        return [def, path];
    }
}
function createStateManagerAndRoute(initState, defaultPath) {
    var routeState = {
        route: {
            paths: initPaths('/app'),
            params: [queryString.parse(window.location.search)]
        }
    };
    initState = __assign({}, initState, routeState);
    var _a = createStateManager_1["default"](initState), Provider = _a.Provider, Consumer = _a.Consumer, store = _a.store;
    var Route = createRoute_1["default"](Consumer, function (state, path) { return state.route.paths[state.route.paths.length - 1] === path; });
    function dispatchRoutePush(path, params) {
        store.setState(function (state) {
            state.route.paths.push(path);
            if (params) {
                state.route.params.push(params);
                window.history.pushState(null, path, path + '?' + queryString.stringify(params));
            }
            else {
                window.history.pushState(null, path, path);
            }
        });
    }
    function dispatchRouteBack() {
        store.setState(function (state) {
            state.route.paths.pop();
            state.route.params.pop();
            window.history.back();
        });
    }
    return { Provider: Provider, Consumer: Consumer, store: store, Route: Route, dispatchRoutePush: dispatchRoutePush, dispatchRouteBack: dispatchRouteBack };
}
exports["default"] = createStateManagerAndRoute;
