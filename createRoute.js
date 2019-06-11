"use strict";
exports.__esModule = true;
var React = require("react");
// 使用状态管理简单模拟一个 react-router, 并且将router也接入状态管理中
function createRoute(Consumer, checker) {
    return function Route(_a) {
        var path = _a.path, children = _a.children;
        return (React.createElement(Consumer, null, function (state) {
            if (checker(state, path)) {
                return children;
            }
            return null;
        }));
    };
}
exports["default"] = createRoute;
