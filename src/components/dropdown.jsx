import React, { Component } from 'react'

import { Link } from 'react-router';

// export class Dropmenu extends Component {
//
// 	render() {
//
// 		const {options, clickEvent} = this.props
//
// 		const optionMap = (option) => {
//
// 			if (option && option.length > 0) {
//
// 				let lis = option.map((v, index) => {
//
// 					let icon  = v.icon  ? <i className={v.icon}></i> : ''
// 					let arrow = v.arrow ? <span className="arrow"></span>     : ''
// 					let badge = v.badge ? <span className="badge red"></span> : ''
//
// 					if (v.hasOwnProperty('url')) {
// 						return (
// 							<li
// 								key={index}
// 								data-value = {index}
// 								onClick    = {e => clickEvent(e.currentTarget.getAttribute("data-value"))}
// 							><Link to={v.url}>{icon}<span>{v.text}</span>{badge}{arrow}</Link>{optionMap(v.children)}</li>
// 						)
// 					} else {
// 						return (
// 							<li
// 								key={index}
// 								data-value = {index}
// 								onClick    = {e => clickEvent(e.currentTarget.getAttribute("data-value"))}
// 							>{icon}<span>{v.text}</span>{badge}{arrow}{optionMap(v.children)}</li>
// 						)
// 					}
// 				})
// 				return (
// 					<ul>
// 						{lis}
// 					</ul>
// 				)
// 			} else {
// 				return null
// 			}
// 		}
//
// 		return optionMap(options)
// 	}
// }

// export class Dropdown extends Component {
// 	constructor(props) {
// 		super(props)
//
// 		//设置 initial state
// 		this.state = {
// 			opened: false
// 		}
//
// 		//ES6 类中函数必须手动绑定
// 		this.handleClick = this.handleClick.bind(this)
// 	}
// 	handleClick(event) {
// 		this.setState({
// 			opened: !this.state.opened
// 		})
// 	}
// 	render() {
// 		const {icon, badge, badgeColor} = this.props
// 		const badgeHtml = (parseInt(badge) > 0) ? <span className={'badge ' + badgeColor}>{badge}</span> : ''
// 		return (
// 			<div className={this.state.opened ? 'dropdown open' : 'dropdown'}>
// 				<div className="dropdown-toggler" onClick={this.handleClick}><i className={icon}></i>{badgeHtml}</div>
// 				<div className="dropdown-main dropdown-menu">
// 					{this.props.children}
// 				</div>
// 			</div>
// 		)
// 	}
// }

// export class Droptool extends Component {
// 	constructor(props) {
// 		super(props)
//
// 		//设置 initial state
// 		this.state = {
// 			opened: false
// 		}
//
// 		//ES6 类中函数必须手动绑定
// 		this.handleClick = this.handleClick.bind(this)
// 	}
// 	handleClick(event) {
// 		this.setState({
// 			opened: !this.state.opened
// 		})
// 	}
// 	render() {
// 		const {icon, bgColor} = this.props
// 		return (
// 			<div className={this.state.opened ? 'tools dropdown open' : 'tools dropdown'}>
// 				<div className={'dropdown-toggler ' + bgColor} onClick={this.handleClick}><i className={icon}></i>&nbsp;<i className="fa fa-angle-down"></i></div>
// 				<div className="dropdown-main dropdown-menu">
// 					{this.props.children}
// 				</div>
// 			</div>
// 		)
// 	}
// }


/*!
 * 下拉菜单对象基类，所有下单菜单组件继承此类
 * @type {Object}
 */
class Dropdown extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: 0,
			text: '请选择'
		}

		this.opend = false

		//ES6 类中函数必须手动绑定
		this.mouseupCallback = this.mouseupCallback.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.selectEvent = this.selectEvent.bind(this)
		this.hide = this.hide.bind(this)
		this.show = this.show.bind(this)
		this.refCallback = this.refCallback.bind(this)

		//document 触发点击事件时关闭 dromdown
		document.addEventListener('mouseup', this.mouseupCallback)
	}

	componentWillMount() {
		this.setState({
			value: this.props.value ? this.props.value : 0,
			text: this.props.text ? this.props.text : '请选择'
		})
	}

	componentWillUnmount() {
		//组件卸载时，同时移除 document 点击事件
		document.removeEventListener('mouseup', this.mouseupCallback)
	}

	//document 点击事件，关闭 dromdown
	mouseupCallback(e) {
		this.hide()
	}

	//展开或关闭 dropdown
	handleClick(event) {
		this.opend ? this.hide() : this.show()
	}

	//关闭 dropdown
	hide() {
		this.instance.classList.add('hidden')
		this.instance.classList.remove('visible')
		setTimeout(()=>{
			this.instance.style.display = 'none'
		}, 300)
		this.opend = false
	}

	//展开 dropdown
	show() {
		this.instance.style.display = 'block'
		setTimeout(()=>{
			this.instance.classList.add('visible')
		}, 5)
		this.opend = true
		// setTimeout(()=>{
		// 	this.instance.classList.remove('hidden')
		// }, 300)
	}

	refCallback(instance) {
		this.instance = instance
	}

	//阻止 dropdown 鼠标 onMouseUp 事件冒泡
	mouseupEvent(event) {
		event.nativeEvent.stopImmediatePropagation()
		event.stopPropagation()
	}

	selectEvent(e) {
		let target = e.target

		//if (target.tagName === 'LI' || target.tagName === 'LI')

		while(target.tagName != 'LI') {
			if (target === e.currentTarget) {
				return false
			}
			target = target.parentNode
		}

		this.hide()

		let value = target.getAttribute("data-value")
		let text = target.textContent

		this.setState({
			value: value ? value : 0,
			text: text ? text : '请选择'
		})

console.log(1);
		//下拉菜单 onchonge 事件
		if (this.props.onChange && typeof this.props.onChange === 'function') {
			this.props.onChange(value, text)
		}
		console.log(2);
	}

	// render() {
	// 	console.log('dropdown 1')
	// 	return (
	// 		<div className="dropdown" onMouseUp={this.mouseupEvent}>
	// 			<input type="hidden" name={this.props.name} value={this.state.value} />
	// 			<div className="dropdown-header button" onClick={this.handleClick}>
	// 				{this.state.text} <i className="icon-dropdown"></i>
	// 			</div>
	// 			<div className="dropdown-main transition" onClick={this.selectEvent} ref={this.refCallback}>
	// 				<ul className="menu">
	// 					<li data-value="iphone">iphone</li>
	// 					<li data-value="ipad">ipad</li>
	// 					<li data-value="Macbook Pro">Macbook Pro</li>
	// 				</ul>
	// 			</div>
	// 		</div>
	// 	)
	// }
}


// export class Dropmenu extends Dropdown {
// 	constructor(props) {
// 		super(props)
// 	}
//
// 	render() {
// 		return (
// 			<div className={this.props.className} onMouseUp={this.mouseupEvent}>
// 				<input type="hidden" name={this.props.name} value={this.state.value} />
// 				<div className="dropdown-toggler" onClick={this.handleClick}>
// 					{this.state.text} <i className="icon-dropdown"></i>
// 				</div>
// 				<div className="dropdown-main transition" onClick={this.selectEvent} ref={this.refCallback}>
// 					{this.props.children}
// 				</div>
// 			</div>
// 		)
// 	}
// }

export class Dropmenu extends Dropdown {
	constructor(props) {
		super(props)
	}

	render() {

		let {size, bgColor} = this.props

		let togglerClassName = 'dropdown-toggler button' + (size ? ' ' + size : '') + (bgColor ? ' ' + bgColor : '')

		return (
			<div className={this.props.className} onMouseUp={this.mouseupEvent}>
				<input type="hidden" name={this.props.name} value={this.state.value} />
				<div className={togglerClassName} onClick={this.handleClick}>
					{this.state.text} <i className="icon-dropdown"></i>
				</div>
				<div className="dropdown-main transition" onClick={this.selectEvent} ref={this.refCallback}>
					{this.props.children}
				</div>
			</div>
		)
	}
}



export class Droptool extends Dropdown {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={this.props.className} onMouseUp={this.mouseupEvent}>
				<input type="hidden" name={this.props.name} value={this.state.value} />
				<div className="dropdown-toggler" onClick={this.handleClick}>
					<i className={this.props.icon}></i>
				</div>
				<div className="dropdown-main transition" onClick={this.selectEvent} ref={this.refCallback}>
					{this.props.children}
				</div>
			</div>
		)
	}
}
