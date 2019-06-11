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
/* eslint-disable react-hooks/exhaustive-deps */
var React = require("react");
var immer_1 = require("immer");
function createStateManager(initalState) {
    // 创建一个  context, 用于后续配合 useContext 进行更新组件
    var store = React.createContext(initalState);
    store.state = initalState;
    store.setState = function (fn) {
        store.state = immer_1["default"](store.state, function (v) { return fn(v); });
    };
    // 创建一个提供者组件
    var Provider = function (props) {
        var _a = React.useState(store.state), state = _a[0], setState = _a[1];
        // 使用 immer 进行更新状态, 确保未更新的对象还是旧的引用
        store.setState = function (fn) { return setState(immer_1["default"](state, function (v) { return fn(v); })); };
        store.state = state;
        return React.createElement(store.Provider, __assign({ value: state }, props));
    };
    // 创建一个消费者组件
    var Consumer = function (_a) {
        var children = _a.children, memo = _a.memo;
        var state = React.useContext(store);
        return React.useMemo(function () {
            return children(state);
        }, memo ? memo(state) : void 0);
    };
    return { Provider: Provider, store: store, Consumer: Consumer };
}
exports["default"] = createStateManager;
