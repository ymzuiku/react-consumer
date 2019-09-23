"use strict";var __extends=this&&this.__extends||function(){var i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),__assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};exports.__esModule=!0;var preact_1=require("preact"),SHOW_DISPLAY="block",HIDDEN_DISPLAY="block",HIDDEN_ZINDEX=1,SHOW_ZINDEX=3,LAST_ZINDEX=2,HIDDEN_POSITION="absolute",SHOW_POSIRION="relative",SHOW_POINTEREVENTS="auto",HIDDEN_POINTEREVENTS="none";function createRoute(_){var t,o;return o=preact_1.Component,__extends(e,o),e.prototype.componentDidMount=function(){this.unListen=_.listen(this.onHistoryUpdate)},e.prototype.componentWillUnmount=function(){this.unListen&&this.unListen(),this.realChild=null,this.animeTimer=null},e.prototype.render=function(){var t=this.props.path,e=this.state,n=e.style;return e.isRenderChild?React.createElement("div",{about:t,style:__assign({width:"100%",height:"100%",overflow:"hidden",left:0,top:0},n)},this.realChild):null},(t=e).defaultProps={sync:"sync",keep:!0,animeTime:0},t;function e(t){var u=o.call(this,t)||this;u.animeTimer=null,u.realChild=null,u.state={isRenderChild:null,realChild:null,style:{display:HIDDEN_DISPLAY,position:HIDDEN_POSITION,zIndex:HIDDEN_ZINDEX}},u.unListen=null,u.onHistoryUpdate=function(){var t=u.props,e=t.path,n=t.delay,i=t.component,o=t.keep,s=t.leaveTime,r=u.state.isRenderChild,l=_.checkUrlMatch(e),a=l.match,p=l.stackMatch,I=l.lastPage;if(a)u.realChild||(void 0===n?(u.realChild=React.createElement(i,null),u.onHistoryUpdate()):i().then(function(t){u.realChild=React.createElement(t,null),u.onHistoryUpdate()})),u.setState({isRenderChild:!0,style:{pointerEvents:SHOW_POINTEREVENTS,display:SHOW_DISPLAY,position:SHOW_POSIRION,zIndex:SHOW_ZINDEX}});else{var c=o&&p;void 0!==r&&!0!==r||(I&&s&&0<s?u.setState({style:{pointerEvents:SHOW_POINTEREVENTS,display:SHOW_DISPLAY,position:HIDDEN_POSITION,zIndex:SHOW_DISPLAY}},function(){setTimeout(function(){u.setState({isRenderChild:c,style:{pointerEvents:HIDDEN_POINTEREVENTS,display:HIDDEN_DISPLAY,position:HIDDEN_POSITION,zIndex:HIDDEN_ZINDEX}})},s)}):u.setState({isRenderChild:c,style:{pointerEvents:HIDDEN_POINTEREVENTS,display:HIDDEN_DISPLAY,position:HIDDEN_POSITION,zIndex:I?LAST_ZINDEX:HIDDEN_ZINDEX}}))}};var e=u.props,n=e.delay,i=e.component;return void 0!==n&&0!==n&&setTimeout(function(){u.state.realChild||i()},n),u}}exports.createRoute=createRoute;