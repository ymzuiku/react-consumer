"use strict";exports.__esModule=!0;var createHistory_1=require("./createHistory"),createRoute_1=require("./createRoute");function bindRouteManager(e){var r=createHistory_1.createHistory(e);return{Route:createRoute_1.createRoute(e,r),history:r}}exports.bindRouteManager=bindRouteManager;