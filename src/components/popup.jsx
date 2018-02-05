import React, { Component } from 'react'



export class Popup extends Component {

	constructor(props) {
		super(props)

		this.timeout = undefined

		this.title = this.props.title
		this.content = this.props.content
		this.style = this.props.style || ''
		this.position = this.props.position || undefined
	}

	getOffsetTop( elements ){
	    var top = elements.offsetTop;
	    var parent = elements.offsetParent;
	    while( parent != null ){
	        top += parent.offsetTop;
	        parent = parent.offsetParent;
	    };
	    return top;
	};


	getOffsetLeft( elements ){
	    var left = elements.offsetLeft;
	    var parent = elements.offsetParent;
	    while( parent != null ){
	        left += parent.offsetLeft;
	        parent = parent.offsetParent;
	    };
	    return left;
	};

	mouseOverEvent(event) {

		window.clearTimeout(this.timeout)

		let popup, header

		popup = document.createElement("div")

		this.popup = popup

		if (this.title) {
			header = document.createElement("div")
			header.className = "header"
			header.appendChild(document.createTextNode(this.title))
			popup.appendChild(header)
		}

		popup.appendChild(document.createTextNode(this.content))

		popup.className = "popup center animates " + this.style

		window.clearTimeout(this.timeout)

		document.body.appendChild(popup)

		let element = event.currentTarget

		//方位
		let	orientation

		//坐标
		let coordinate = ""

		//计算event.currentTarget(绑定事件元素)的宽高和位置
		let elementAttr = {
			width   : element.offsetWidth,
			height  : element.offsetHeight,
			offsetTop : this.getOffsetTop(element) - document.documentElement.scrollTop,
			offsetLeft : this.getOffsetLeft(element)
		}

		//计算消息框的宽高和位置
		let popupAttr = {
			width   : popup.offsetWidth,
			height  : popup.offsetHeight,
			offsetTop : this.getOffsetTop(popup),
			offsetLeft : this.getOffsetLeft(popup)
		}

		let screenarea  = {
				scrollTop	: document.documentElement.scrollTop,
				height 		: window.screen.availHeight,
				width  		: window.screen.availWidth
			},

			//计算当前视窗的边界能否容下弹出框的大小
			containment = {
				left   : elementAttr.offsetLeft > popupAttr.width,
				top    : elementAttr.offsetTop > popupAttr.height,
				right  : screenarea.width - elementAttr.offsetLeft - elementAttr.width >  popupAttr.width,
				bottom : screenarea.height - elementAttr.offsetTop - elementAttr.height >  popupAttr.height
			}



		if (this.position) {
			//如果参数设置了位置，直接使用参数
			orientation = this.position
		} else {
			//如果参数没有设置位置，则自动计算
			if (containment.left && containment.top && containment.right) {
				orientation = 'top';
			} else {
				if (containment.left && containment.bottom && containment.right) {
					orientation = 'bottom';
				} else {
					if (containment.right) {
						orientation = 'right';
					} else {
						orientation = 'left';
					}
				}
			}
		}
		this.orientation = orientation

		//基于方位计算坐标 (left, top)
		switch (orientation) {
			case "top":
				coordinate = {
				  top    : elementAttr.offsetTop - ( popupAttr.height + 8 ),
				  left   : elementAttr.offsetLeft + elementAttr.width / 2 - popupAttr.width / 2
				};
				break;
			case "bottom":
				coordinate = {
				  top    : elementAttr.offsetTop + elementAttr.height + 8,
				  left   : elementAttr.offsetLeft + elementAttr.width / 2 - popupAttr.width / 2
				};
				break;
			case "right":
				coordinate = {
				  top    : elementAttr.offsetTop + elementAttr.height / 2 - popupAttr.height / 2,
				  left   : elementAttr.offsetLeft + elementAttr.width + 8
				};
				break;
			case "left":
				coordinate = {
				  top    : elementAttr.offsetTop + elementAttr.height / 2 - popupAttr.height / 2 - 2,
				  left   : elementAttr.offsetLeft - popupAttr.width - 8
				};
				break;
		}

		// console.log ("elementAttr", elementAttr);
		// console.log ("popupAttr", popupAttr);
		// console.log ("screenarea", screenarea);
		// console.log ("containment", containment);
		// console.log ("orientation", orientation);
		// console.log ("coordinate", coordinate);

		popup.className += " " + orientation
		popup.style = `left: ${coordinate.left}px; top: ${coordinate.top + screenarea.scrollTop}px; right: auto; bottom: auto; display: table`
		popup.className += " visible"
	}

	mouseOutEvent() {
		let visibleRegExp = new RegExp('(\\s|^)' + 'visible' + '(\\s|$)')
		this.popup.className = this.popup.className.replace(visibleRegExp, ' ')
		this.timeout = window.setTimeout(() => {
			// let orientationRegExp = new RegExp('(\\s|^)' + this.orientation + '(\\s|$)')
			// this.popup.className = this.popup.className.replace(orientationRegExp, ' ')
			document.body.removeChild(this.popup)
		},300);
	}

	render() {

		const {title, content, style} = this.props

		return React.cloneElement(this.props.children, {
			onMouseOver: this.mouseOverEvent.bind(this),
			onMouseOut: this.mouseOutEvent.bind(this)
		})

	}
}
