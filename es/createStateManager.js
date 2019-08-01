"use strict";var __extends=this&&this.__extends||function(){var o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();exports.__esModule=!0;var immer_1=require("immer"),React=require("react");function createStateManager(t){function e(t){return o.add(t),function(){o.delete(t)}}var n,o=new Set,i={listen:e,state:t,subscribes:o,updateState:function(e){i.state=immer_1.default(i.state,function(t){return e(t)}),o.forEach(function(t){t(i.state)})}},r=(n=React.Component,__extends(s,n),s.prototype.componentWillUnmount=function(){this.unListen(),this.props.beforeUnmount&&this.props.beforeUnmount(this.lastMemo)},s.prototype.render=function(){return this.props.children(this.lastMemo,i.state)},s);function s(t){var a=n.call(this,t)||this;if(a.lastMemo=[],a.handleListen=function(t){for(var e=a.props,n=e.beforeUpdate,o=(0,e.memo)(i.state),r=!1,s=0;s<a.lastMemo.length;s++)if(a.lastMemo[s]!==o[s]){r=!0;break}a.lastMemo=o.slice(),r&&(void 0!==n&&n(o),a.forceUpdate())},a.shouldComponentUpdate=function(){return!1},void 0===a.props.memo)throw new Error('<Consumer /> need "memo" props');return a.lastMemo=a.props.memo(i.state).slice(),a.unListen=e(a.handleListen),a}return{store:i,Consumer:r}}exports.createStateManager=createStateManager;