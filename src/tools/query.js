export class Query {
    constructor(selector) {
        //dom节点集合
        this.nodeList = []

        if (typeof selector == "string") {
            //如果 selector 是 css 选择器
            let elements = document.querySelectorAll(selector)
            for (let i = 0; i < elements.length; i++) {
                this.nodeList.push(elements[i])
            }
        } else {
            //如果 selector 是 dom 对象
            if ( selector instanceof HTMLElement || document instanceof Document ) {
                this.nodeList.push(selector)
            } else {
                if ( selector instanceof HTMLCollection ) {
                    for (let i = 0; i < selector.length; i++) {
                        this.nodeList.push(selector[i])
                    }
                }
            }
        }
	}
}

Object.assign(Query.prototype, {
    /* 以下是筛选相关方法 */

    each(fun) {
        if ( typeof fun == "function") {
            for (let i = 0; i < this.nodeList.length; i++) {
                fun(i, this.nodeList[i])
            }
        }
    },

    //获取第一个元素
    first() {
        return new Query(this.nodeList[0])
    },

    //获取第一个元素
    last() {
        return new Query(this.nodeList[this.nodeList.length - 1])
    },

    //返回元素在同辈元素中的位置
    index() {
        var elems = this.nodeList[0].parentNode.children;
        for(let i = 0; i < elems.length; i++) {
            if( elems[i] == this.nodeList[0] ) {
                return i;
            }
        }
    },

    //返回集合中的第n个元素
    eq(n) {
        return new Query(this.nodeList[n < 0 ? n = 0 : n > this.nodeList.length ? n  = this.nodeList.length : n])
    }

}, {
    /* 以下是操作相关的方法 */

    //检测是否包含某个 class
    hasClass(className) {
        //return new RegExp(' ' + className + ' ').test(' ' + this.nodeList[0].className + ' ')
        return this.nodeList[0].classList.contains(className)
    },

    //添加class
    addClass(className) {
        this.each(function(index, element) {
            element.classList.add(className)
        })
        return this
    },

    //移除class
    removeClass(className) {
        this.each(function(index, element) {
            element.classList.remove(className)
        })
        return this
    },

    //切换class
    toggleClass(className) {
        this.each(function(index, element) {
            element.classList.toggle(className)
        })
        return this
    },

    //位置
    offset() {
        let getOffsetTop = function( elements ) {
    	    var top = elements.offsetTop;
    	    var parent = elements.offsetParent
    	    while ( parent != null ) {
    	        top += parent.offsetTop;
    	        parent = parent.offsetParent
    	    };
    	    return top
    	};

    	let getOffsetLeft = function( elements ) {
    	    var left = elements.offsetLeft
    	    var parent = elements.offsetParent
    	    while ( parent != null ) {
    	        left += parent.offsetLeft
    	        parent = parent.offsetParent
    	    };
    	    return left
    	};

        return {
            top: getOffsetTop(this.nodeList[0]),
            left: getOffsetLeft(this.nodeList[0])
        }
    },

    //滚动条水平位置
    scrollLeft(value) {
        let element = this.nodeList[0]
        if (!element.tagName) {
             element = document.scrollingElement || document.documentElement
        }
        if (value) {
            element.scrollLeft = value
            return this
        } else {
            return element.scrollLeft
        }
    },

    //滚动条垂直位置
    scrollTop(value) {
        let element = this.nodeList[0]
        console.log(element);
        if (!element.tagName) {
             element = document.scrollingElement || document.documentElement
        }
        if (value) {
            element.scrollTop = value
            return this
        } else {
            return element.scrollTop
        }
    },

    //取值
    val() {
        let element = this.nodeList[0]
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            return element.value
        }

        if (element.tagName === 'SELECT') {
            return element.options[element.selectedIndex].value
        }
    },

    //文本
    text(text) {
        let element = this.nodeList[0]
        if (typeof text === 'undefined') {
            return element.textContent
        } else {
            element.textContent = text
            return this
        }
    },

    //html
    html(html) {
        let element = this.nodeList[0]

        if (typeof html === 'undefined') {
            return element.innerHTML
        } else {
            element.innerHTML = html
            return this
        }
    },

    //动画
    animate(css, speed, easing, fn) {

        //获取元素的全局样式 （包括 style 属性和 class 中定义的 css）
        const getStyle = (element, prop) => {
            if (element.currentStyle) {
                //IE下用 currentStyle ，非IE用 getComputedStyle
                return element.currentStyle[prop]
            } else {
                return document.defaultView.getComputedStyle(element, null)[prop]
            }
        }

        //缓动求值函数, 这里只定义了三个常用，可以从 tween.js 里扩充
        let ease;

        if (easing) {
            switch (easing) {
                case 'easein':
                    ease = function(t,b,c,d){
                        return c*(t/=d)*t + b;
                    }
                    break;
                case 'easeOut':
                    ease = function(t,b,c,d){
                        return -c *(t/=d)*(t-2) + b;
                    }
                    break;
                case 'easeInOut':
                    ease = function(t,b,c,d){
                        if ((t/=d/2) < 1) return c/2*t*t + b;
                        return -c/2 * ((--t)*(t-2) - 1) + b;
                    }
                    break;
                default:
                    ease = function(t,b,c,d){ return c*t/d + b; }
            }
        } else {
            ease = function(t,b,c,d){ return c*t/d + b; }
        }

        let time = 0, timeout = speed / 1000

        const animate = (element, css) => {

            //清除之前的 Interval
            clearInterval(element.timer)

            //当前样式
            let currentStyle = {}

            //变化量
            let changeStyle = {}

            for (let prop in css) {
                if (prop == "opacity") {
                    currentStyle["opacity"] = Math.round(parseFloat(getStyle(element, prop)) * 100)
                    changeStyle[prop] = css[prop] * 100 - currentStyle[prop]
                } else {
                    currentStyle[prop] = parseInt(getStyle(element, prop))
                    changeStyle[prop] = css[prop] - currentStyle[prop]
                }
            }

            element.timer = setInterval(function(){

                if (time > speed) {
                    time = speed
                } else {
                    time = time + 16
                }

                for (let prop in css) {
                    let value = ease(time / 1000, currentStyle[prop], changeStyle[prop], timeout)
                    if (prop == "opacity") {
                        element.style.opacity = value / 100
                    } else {
                        element.style[prop] = value + 'px'
                    }
                }

                if (time == speed) {
                    clearInterval(element.timer)
                    if (typeof fn === 'function') {
                        fn()
                    }
                }

            }, 16)
        }

        this.each(function(index, element) {
            animate(element, css)
        })

        return this
    }

})


const queryInit = function(selector) {
    return new Query(selector)
}

window.$ = queryInit

export default queryInit
