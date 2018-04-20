/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _query = __webpack_require__(1);

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log((0, _query2.default)('title').text()); //引入 Query

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Query = exports.Query = function Query(selector) {
    _classCallCheck(this, Query);

    //dom节点集合
    this.nodeList = [];

    if (typeof selector == "string") {
        //如果 selector 是 css 选择器
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
            this.nodeList.push(elements[i]);
        }
    } else {
        //如果 selector 是 dom 对象
        if (selector instanceof HTMLElement) {
            this.nodeList.push(selector);
        } else {
            if (selector instanceof HTMLCollection) {
                for (var _i = 0; _i < selector.length; _i++) {
                    this.nodeList.push(selector[_i]);
                }
            }
        }
    }
};

Object.assign(Query.prototype, {
    /* 以下是筛选相关方法 */

    each: function each(fun) {
        if (typeof fun == "function") {
            for (var i = 0; i < this.nodeList.length; i++) {
                fun(i, this.nodeList[i]);
            }
        }
    },


    //获取第一个元素
    first: function first() {
        return new Query(this.nodeList[0]);
    },


    //获取第一个元素
    last: function last() {
        return new Query(this.nodeList[this.nodeList.length - 1]);
    },


    //返回元素在同辈元素中的位置
    index: function index() {
        var elems = this.nodeList[0].parentNode.children;
        for (var i = 0; i < elems.length; i++) {
            if (elems[i] == this.nodeList[0]) {
                return i;
            }
        }
    },


    //返回集合中的第n个元素
    eq: function eq(n) {
        return new Query(this.nodeList[n < 0 ? n = 0 : n > this.nodeList.length ? n = this.nodeList.length : n]);
    }
}, {
    /* 以下是操作相关的方法 */

    //检测是否包含某个 class
    hasClass: function hasClass(className) {
        //return new RegExp(' ' + className + ' ').test(' ' + this.nodeList[0].className + ' ')
        return this.nodeList[0].classList.contains(className);
    },


    //添加class
    addClass: function addClass(className) {
        this.each(function (index, element) {
            element.classList.add(className);
        });
        return this;
    },


    //移除class
    removeClass: function removeClass(className) {
        this.each(function (index, element) {
            element.classList.remove(className);
        });
        return this;
    },


    //切换class
    toggleClass: function toggleClass(className) {
        this.each(function (index, element) {
            element.classList.toggle(className);
        });
        return this;
    },


    //位置
    offset: function offset() {
        var getOffsetTop = function getOffsetTop(elements) {
            var top = elements.offsetTop;
            var parent = elements.offsetParent;
            while (parent != null) {
                top += parent.offsetTop;
                parent = parent.offsetParent;
            };
            return top;
        };

        var getOffsetLeft = function getOffsetLeft(elements) {
            var left = elements.offsetLeft;
            var parent = elements.offsetParent;
            while (parent != null) {
                left += parent.offsetLeft;
                parent = parent.offsetParent;
            };
            return left;
        };

        return {
            top: getOffsetTop(this.nodeList[0]),
            left: getOffsetLeft(this.nodeList[0])
        };
    },


    //取值
    val: function val() {
        var element = this.nodeList[0];
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            return element.value;
        }

        if (element.tagName === 'SELECT') {
            return element.options[element.selectedIndex].value;
        }
    },


    //文本
    text: function text() {
        var element = this.nodeList[0];
        return element.textContent;
    }
});

var queryInit = function queryInit(selector) {
    return new Query(selector);
};

window.$ = queryInit;

exports.default = queryInit;

/***/ })
/******/ ]);