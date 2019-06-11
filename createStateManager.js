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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
/* eslint-disable react-hooks/exhaustive-deps */
var React = require("react");
var immer_1 = require("immer");
function createStateManager(initalState) {
    // 创建一个  context, 用于后续配合 useContext 进行更新组件
    var store = React.createContext(initalState);
    // 创建一个提供者组件
    var Provider = function (_a) {
        var _b = _a.defaultState, defaultState = _b === void 0 ? initalState : _b, rest = __rest(_a, ["defaultState"]);
        var _c = React.useState(defaultState), state = _c[0], setState = _c[1];
        // 使用 immer 进行更新状态, 确保未更新的对象还是旧的引用
        store.setState = function (fn) { return setState(immer_1["default"](state, function (v) { return fn(v); })); };
        store.state = state;
        return React.createElement(store.Provider, __assign({ value: state }, rest));
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
