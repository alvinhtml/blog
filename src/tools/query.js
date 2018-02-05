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
            if ( selector instanceof HTMLElement ) {
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
        for(let i = 0; i < elems.length; i++){
            if( elems[i] == this.nodeList[0] ){
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
    offset(){
        let getOffsetTop = function( elements ){
    	    var top = elements.offsetTop;
    	    var parent = elements.offsetParent;
    	    while( parent != null ){
    	        top += parent.offsetTop;
    	        parent = parent.offsetParent;
    	    };
    	    return top;
    	};

    	let getOffsetLeft = function( elements ){
    	    var left = elements.offsetLeft;
    	    var parent = elements.offsetParent;
    	    while( parent != null ){
    	        left += parent.offsetLeft;
    	        parent = parent.offsetParent;
    	    };
    	    return left;
    	};

        return {
            top: getOffsetTop(this.nodeList[0]),
            left: getOffsetLeft(this.nodeList[0])
        }
    },

    //取值
    val(){
        let element = this.nodeList[0]
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            return element.value
        }

        if (element.tagName === 'SELECT') {
            return element.options[element.selectedIndex].value
        }

    }
})


const queryInit = function(selector) {
    return new Query(selector)
}

window.$ = queryInit

export default queryInit
