"use strict";var __extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();exports.__esModule=!0;var immer_1=require("immer"),React=require("react");function createStateManager(t){function e(t){return r.add(t),function(){r.delete(t)}}var n,r=new Set,o=t,u={listen:e,getState:function(){return o},subscribes:r,update:function(e){o=immer_1.default(u.getState(),function(t){e(t)}),r.forEach(function(t){t(o)})}},s=(n=React.Component,__extends(i,n),i.prototype.componentWillUnmount=function(){this.unListen(),this.props.beforeUnmount&&this.props.beforeUnmount(this.lastMemo)},i.prototype.render=function(){var t;return(t=this.props).children.apply(t,this.lastMemo)},i);function i(t){var i=n.call(this,t)||this;if(i.lastMemo=[],i.state={num:0},i.handleListen=function(t){for(var e=i.props,n=e.beforeUpdate,r=(0,e.subscribe)(u.getState()),o=!1,s=0;s<i.lastMemo.length;s++)if(i.lastMemo[s]!==r[s]){o=!0;break}i.lastMemo=r.slice(),o&&(void 0!==n&&n(r),i.setState(function(t){return{num:t.num+1}}))},i.shouldComponentUpdate=function(t,e){return e.num!==i.state.num||!!t.scu&&t.shouldComponentUpdate(i.lastMemo)},void 0===i.props.subscribe)throw new Error('<Consumer /> need "subscrib" props');return i.lastMemo=i.props.subscribe(u.getState()).slice(),i.unListen=e(i.handleListen),i}return{store:u,Consumer:s}}exports.createStateManager=createStateManager;