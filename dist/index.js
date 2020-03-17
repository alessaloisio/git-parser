!function(t,e){for(var r in e)t[r]=e[r]}(exports,function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=3)}([function(t,e){t.exports=require("path")},function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("zlib")},function(t,e,r){"use strict";r.r(e),r.d(e,"GitParser",(function(){return d}));var n=r(0),o=r(1),u=r(2);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e){c=function(t,e){return new u(t,void 0,e)};var r=s(RegExp),n=RegExp.prototype,o=new WeakMap;function u(t,e,n){var u=r.call(this,t,e);return o.set(u,n||o.get(t)),u}function f(t,e){var r=o.get(e);return Object.keys(r).reduce((function(e,n){return e[n]=t[r[n]],e}),Object.create(null))}return a(u,r),u.prototype.exec=function(t){var e=n.exec.call(this,t);return e&&(e.groups=f(e,this)),e},u.prototype[Symbol.replace]=function(t,e){if("string"==typeof e){var r=o.get(this);return n[Symbol.replace].call(this,t,e.replace(/\$<([^>]+)>/g,(function(t,e){return"$"+r[e]})))}if("function"==typeof e){var u=this;return n[Symbol.replace].call(this,t,(function(){var t=[];return t.push.apply(t,arguments),"object"!==i(t[t.length-1])&&t.push(f(t,u)),e.apply(this,t)}))}return n[Symbol.replace].call(this,t,e)},c.apply(this,arguments)}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}function s(t){var e="function"==typeof Map?new Map:void 0;return(s=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return l(t,arguments,b(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),p(n,t)})(t)}function f(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function l(t,e,r){return(l=f()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&p(o,r.prototype),o}).apply(null,arguments)}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function b(t){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function y(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function h(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?y(Object(r),!0).forEach((function(e){m(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function m(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var d=function(){function t(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.path=t.path||"./.git",this.selectedBranch=t.branch||"master",this.HEAD=this.getHead(),this.lastCommit=this.getLastCommit()}var e=t.prototype;return e.getHead=function(){var t=g(Object(n.resolve)(this.path,"HEAD"));return t.trim().slice(t.lastIndexOf("/")+1)},e.getLastCommit=function(){return g(Object(n.resolve)(this.path,"refs/heads",this.selectedBranch)).trim()},e.branch=function(){return v(Object(n.resolve)(this.path,"refs/heads"))},e.stage=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.recursiveObject(t||this.lastCommit);return e.present={commit:e.present,files:this.recursiveObject(e.present)},e},e.diff=function(){var t=this.stage();return t.parent={commit:t.parent,files:h({},this.stage(t.parent).present.files)},j(t.present,t.parent)},e.recursiveObject=function(t){var e=t.slice(0,2),r=t.slice(2),o=Object(n.resolve)(this.path,"objects",e,r);return this.decryptFile(o)},e.decryptFile=function(t){var e=Object(u.inflateSync)(g(t,!1)),r=e.slice(0,e.indexOf(32)).toString("utf8"),n=e.slice(e.indexOf(0)+1),o={};switch(r){case"commit":o=this.parseCommit(n.toString("utf8"));break;case"tree":o=this.parseTree(n.toString("hex"));break;case"blob":o=n.toString();break;default:return null}return o},e.parseCommit=function(t){var e=c(/tree ([0-9A-Z_a-z]*)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?parent ([0-9A-Z_a-z]*)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?author ([ \.0-9<>@-Z_a-z]*>).*[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?committer ([ \.0-9<>@-Z_a-z]*>).*\n\n(.*)/,{tree:1,parent:2,author:3,committer:4,message:5}),r=t.match(e),n={};return n.present=r.groups.tree,n.parent=r.groups.parent,n.author=r.groups.author,n.committer=r.groups.committer,n.message=r.groups.message,n},e.parseTree=function(t){var e=this,r=c(/([0-9A-Z_a-z]*?)20([0-9A-Z_a-z]*?)00([0-9A-Z_a-z]{40})/g,{mode:1,file:2,oid:3}),n={};return Array.from(t.matchAll(r),(function(t){var r={};switch(r.mode=Buffer.from(t.groups.mode,"hex").toString("utf8"),"40000"===r.mode&&(r.mode=0+r.mode),r.type=O(r.mode),r.file=Buffer.from(t.groups.file,"hex").toString("utf8"),r.oid=t.groups.oid,r.type){case"tree":r.files=e.recursiveObject(r.oid);break;case"blob":r.content=e.recursiveObject(r.oid)}n[r.file]=r})),n},t}(),g=function(t){var e,r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];try{e=Object(o.readFileSync)(t)}catch(e){throw new Error('"'.concat(t,'" file not found.'))}return r?e.toString():e},v=function(t){var e;try{e=Object(o.readdirSync)(t)}catch(e){throw new Error('"'.concat(t,'" not file found.'))}return e},O=function(t){switch(t){case"040000":return"tree";case"100644":case"100755":case"120000":return"blob";case"160000":return"commit";default:throw new Error("Mode not found.")}},j=function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o={};return Object.keys(e.files).map((function(u){var i=e.files[u],c=r.files[u];switch(i.type){case"blob":c?(i.content!==c.content&&(i.status="M",o[u]=i),delete r.files[u]):(i.status="NF",o[u]=i);break;case"tree":if(c){var a=t(i,c,n+1);Object.keys(a).length>0?o[u]=a:delete r.files[u]}else o[u]=i.files}})),0===n&&S(o,r.files,"R"),o},S=function t(e,r,n){Object.keys(r).map((function(o){"tree"===r[o].type?(void 0===e[o]&&(e[o]={}),t(e[o],r[o].files,n)):(r[o].status=n,e[o]=r[o])}))}}]));