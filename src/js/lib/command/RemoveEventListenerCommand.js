"use strict";var __extends=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var CmpApiModel_1=require("../CmpApiModel"),Command_1=require("./Command"),RemoveEventListenerCommand=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.respond=function(){this.invokeCallback(CmpApiModel_1.CmpApiModel.eventQueue.remove(this.param))},t}(Command_1.Command);exports.RemoveEventListenerCommand=RemoveEventListenerCommand;