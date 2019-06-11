"use strict";
exports.__esModule = true;
var React = require("react");
exports.urlTools = {
    defaultPath: function (def) {
        return window.location.pathname === '/' ? def : window.location.pathname;
    },
    params: function () {
        return window.location.pathname.split('?')[1] && JSON.parse(window.location.pathname.split('?')[1]);
    },
    replace: function (path, state) {
        if (state) {
            window.history.replaceState(null, path, path + '?' + JSON.stringify(state));
        }
        else {
            window.history.replaceState(null, path, path);
        }
    }
};
// 使用状态管理简单模拟一个 react-router, 并且将router也接入状态管理中
function createRoute(Consumer, pathGetter, paramsGetter) {
    return function Route(_a) {
        var path = _a.path, children = _a.children;
        return (React.createElement(Consumer, null, function (state) {
            if (pathGetter(state) === path) {
                // 同步浏览器 url
                exports.urlTools.replace(path, paramsGetter(state));
                return children;
            }
            return null;
        }));
    };
}
exports["default"] = createRoute;
