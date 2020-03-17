!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("zlib")},function(e,t,r){"use strict";r.r(t),r.d(t,"GitParser",(function(){return d}));var n=r(0),o=r(1),u=r(2);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){c=function(e,t){return new u(e,void 0,t)};var r=s(RegExp),n=RegExp.prototype,o=new WeakMap;function u(e,t,n){var u=r.call(this,e,t);return o.set(u,n||o.get(e)),u}function f(e,t){var r=o.get(t);return Object.keys(r).reduce((function(t,n){return t[n]=e[r[n]],t}),Object.create(null))}return a(u,r),u.prototype.exec=function(e){var t=n.exec.call(this,e);return t&&(t.groups=f(t,this)),t},u.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var r=o.get(this);return n[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+r[t]})))}if("function"==typeof t){var u=this;return n[Symbol.replace].call(this,e,(function(){var e=[];return e.push.apply(e,arguments),"object"!==i(e[e.length-1])&&e.push(f(e,u)),t.apply(this,e)}))}return n[Symbol.replace].call(this,e,t)},c.apply(this,arguments)}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}function s(e){var t="function"==typeof Map?new Map:void 0;return(s=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return l(e,arguments,b(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),p(n,e)})(e)}function f(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function l(e,t,r){return(l=f()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&p(o,r.prototype),o}).apply(null,arguments)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){m(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var d=function(){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.path=e.path||"./.git",this.selectedBranch=e.branch||"master",this.HEAD=this.getHead(),this.lastCommit=this.getLastCommit()}var t=e.prototype;return t.getHead=function(){var e=g(Object(n.resolve)(this.path,"HEAD"));return e.trim().slice(e.lastIndexOf("/")+1)},t.getLastCommit=function(){return g(Object(n.resolve)(this.path,"refs/heads",this.selectedBranch)).trim()},t.branch=function(){return v(Object(n.resolve)(this.path,"refs/heads"))},t.stage=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.recursiveObject(e||this.lastCommit);return t.present={commit:t.present,files:this.recursiveObject(t.present)},t},t.diff=function(){var e=this.stage();return e.parent={commit:e.parent,files:h({},this.stage(e.parent).present.files)},console.log(j(e.present,e.parent)),e},t.recursiveObject=function(e){var t=e.slice(0,2),r=e.slice(2),o=Object(n.resolve)(this.path,"objects",t,r);return this.decryptFile(o)},t.decryptFile=function(e){var t=Object(u.inflateSync)(g(e,!1)),r=t.slice(0,t.indexOf(32)).toString("utf8"),n=t.slice(t.indexOf(0)+1),o={};switch(r){case"commit":o=this.parseCommit(n.toString("utf8"));break;case"tree":o=this.parseTree(n.toString("hex"));break;case"blob":o=n.toString();break;default:return null}return o},t.parseCommit=function(e){var t=c(/tree ([0-9A-Z_a-z]*)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?parent ([0-9A-Z_a-z]*)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?author ([ \.0-9<>@-Z_a-z]*>).*[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]?committer ([ \.0-9<>@-Z_a-z]*>).*\n\n(.*)/,{tree:1,parent:2,author:3,committer:4,message:5}),r=e.match(t),n={};return n.present=r.groups.tree,n.parent=r.groups.parent,n.author=r.groups.author,n.committer=r.groups.committer,n.message=r.groups.message,n},t.parseTree=function(e){var t=this,r=c(/([0-9A-Z_a-z]*?)20([0-9A-Z_a-z]*?)00([0-9A-Z_a-z]{40})/g,{mode:1,file:2,oid:3}),n={};return Array.from(e.matchAll(r),(function(e){var r={};switch(r.mode=Buffer.from(e.groups.mode,"hex").toString("utf8"),"40000"===r.mode&&(r.mode=0+r.mode),r.type=O(r.mode),r.file=Buffer.from(e.groups.file,"hex").toString("utf8"),r.oid=e.groups.oid,r.type){case"tree":r.files=t.recursiveObject(r.oid);break;case"blob":r.content=t.recursiveObject(r.oid)}n[r.file]=r})),n},e}(),g=function(e){var t,r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];try{t=Object(o.readFileSync)(e)}catch(t){throw new Error('"'.concat(e,'" file not found.'))}return r?t.toString():t},v=function(e){var t;try{t=Object(o.readdirSync)(e)}catch(t){throw new Error('"'.concat(e,'" not file found.'))}return t},O=function(e){switch(e){case"040000":return"tree";case"100644":case"100755":case"120000":return"blob";case"160000":return"commit";default:throw new Error("Mode not found.")}},j=function e(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o={};return Object.keys(t.files).map((function(u){var i=t.files[u],c=r.files[u];switch(i.type){case"blob":c?(i.content!==c.content&&(i.status="M",o[u]=i),delete r.files[u]):(i.status="NF",o[u]=i);break;case"tree":if(c){var a=e(i,c,n+1);Object.keys(a).length>0?o[u]=a:delete r.files[u]}else o[u]=i.files}})),0===n&&console.log("removed ?",r.files.services.files),o}}]));