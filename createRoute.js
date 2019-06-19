"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * 使用状态管理简单模拟一个 react-router, 并且将router也接入状态管理中
 */
function createRoute(Consumer) {
    return function Route(_a) {
        var path = _a.path, children = _a.children;
        return (React.createElement(Consumer, null, function (state) {
            var s = state;
            var nowPathList = s.route.paths[s.route.paths.length - 1].split('/');
            var newPathList = path.split('/');
            var match = true;
            nowPathList.forEach(function (str, i) {
                if (str !== newPathList[i]) {
                    match = false;
                }
            });
            if (match) {
                return children;
            }
            return null;
        }));
    };
}
exports.createRoute = createRoute;
