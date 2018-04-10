import React, { Component } from 'react'

import {
	connect
} from 'react-redux'



export class Tabs extends Component {

	constructor(props) {
		super(props)

		this.state = {
			show: parseInt(this.props.defaultMain) - 1
		}

		//ES6 类中函数必须手动绑定
		this.toggleEvent = this.toggleEvent.bind(this)


	}



	toggleEvent(e) {
		this.setState({
			show: parseInt(e.currentTarget.getAttribute('data-id'))
		})
	}

	render() {

		// let togger = this.props.togger

		// let toggerHTML = togger.map((v, i) => {
		// 	return (<div key={i} className="upload-item">{content}</div>)
		// })
		//

		let togglers = []
		let show = this.state.show


		const mainHTML = React.Children.map(this.props.children, (v, i) => {
			togglers.push(
				<li key={i} data-id={i} className={show === i ? 'active' : ''} onClick={this.toggleEvent}>{v.props.toggler}</li>
			)
		    return show === i ? v : ''
		});


        return (
			<div className={this.props.className}>
				<ul className="tabs-header clear">
					{togglers}
				</ul>
				<div className="tabs-main">
					{mainHTML}
				</div>
			</div>
        );
    }
}

export class TabsToggler extends Component {
	constructor(props) {
		super(props)
	}

	render() {

        return (
			<div {...this.props}>{this.props.children}</div>
        );
    }
}

export class Tab extends Component {

	constructor(props) {
		super(props)
	}

	render() {

        return (
			<div className={this.props.className}>{this.props.children}</div>
        );
    }
}
