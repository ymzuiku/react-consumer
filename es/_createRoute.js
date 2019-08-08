"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var a in e=arguments[r])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)},__rest=this&&this.__rest||function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]])}return r};exports.__esModule=!0;var React=require("react"),cacheGetMatch=new Map,getMatch=function(t,e){var r=t+e;if(cacheGetMatch.has(r))return cacheGetMatch.get(r);var n=t&&t.split("/"),a=e&&e.split("/");if(!a||!n)return cacheGetMatch.set(r,!1),!1;var c=!0;return n.forEach(function(t,e){"*"!==t&&t!==a[e]&&(c=!1)}),cacheGetMatch.set(r,c),c};function createRoute(e){return function(t){var c=t.style,i=t.path,s=t.keep,o=t.children,h=__rest(t,["style","path","keep","children"]);return React.createElement(e,{memo:function(t){return[t.paths[t.paths.length-1],t.paths]}},function(t){var e=t[0],r=t[1],n=getMatch(i,e);if(n&&!s)return React.createElement("div",__assign({about:i,style:__assign({width:"100%",height:"100%"},c)},h),o);if(s){var a=!1;return r.forEach(function(t){getMatch(i,t)&&(a=!0)}),!1===a?null:React.createElement("div",__assign({about:i,style:__assign({display:n?void 0:"none",width:"100%",height:"100%"},c)},h),o)}return null})}}exports.createRoute=createRoute;