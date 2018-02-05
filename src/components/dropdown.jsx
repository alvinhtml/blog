import React, { Component } from 'react'

import { Link } from 'react-router';



export class Dropmenu extends Component {

	render() {

		const {options, clickEvent} = this.props

		const optionMap = (option) => {

			if (option && option.length > 0) {

				let lis = option.map((v, index) => {

					let icon  = v.icon  ? <i className={v.icon}></i> : ''
					let arrow = v.arrow ? <span className="arrow"></span>     : ''
					let badge = v.badge ? <span className="badge red"></span> : ''

					if (v.hasOwnProperty('url')) {
						return (
							<li
								key={index}
								data-value = {index}
								onClick    = {e => clickEvent(e.currentTarget.getAttribute("data-value"))}
							><Link to={v.url}>{icon}<span>{v.text}</span>{badge}{arrow}</Link>{optionMap(v.children)}</li>
						)
					} else {
						return (
							<li
								key={index}
								data-value = {index}
								onClick    = {e => clickEvent(e.currentTarget.getAttribute("data-value"))}
							>{icon}<span>{v.text}</span>{badge}{arrow}{optionMap(v.children)}</li>
						)
					}
				})
				return (
					<ul>
						{lis}
					</ul>
				)
			} else {
				return null
			}
		}

		return optionMap(options)
	}
}

export class Dropdown extends Component {
	constructor(props) {
		super(props)

		//设置 initial state
		this.state = {
			opened: false
		}

		//ES6 类中函数必须手动绑定
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(event) {
		this.setState({
			opened: !this.state.opened
		})
	}
	render() {
		const {icon, badge, badgeColor} = this.props
		const badgeHtml = (parseInt(badge) > 0) ? <span className={'badge ' + badgeColor}>{badge}</span> : ''
		return (
			<div className={this.state.opened ? 'dropdown open' : 'dropdown'}>
				<div className="dropdown-toggler" onClick={this.handleClick}><i className={icon}></i>{badgeHtml}</div>
				<div className="dropdown-main dropdown-menu">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export class Droptool extends Component {
	constructor(props) {
		super(props)

		//设置 initial state
		this.state = {
			opened: false
		}

		//ES6 类中函数必须手动绑定
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(event) {
		this.setState({
			opened: !this.state.opened
		})
	}
	render() {
		const {icon, bgColor} = this.props
		return (
			<div className={this.state.opened ? 'tools dropdown open' : 'tools dropdown'}>
				<div className={'dropdown-toggler ' + bgColor} onClick={this.handleClick}><i className={icon}></i>&nbsp;<i className="fa fa-angle-down"></i></div>
				<div className="dropdown-main dropdown-menu">
					{this.props.children}
				</div>
			</div>
		)
	}
}
