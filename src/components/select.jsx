import React, { Component } from 'react'

import {
	connect
} from 'react-redux'

//引入action类型常量名
import {
	GET_OU_IN_COMPONENT
} from '../constants'


//引入Action创建函数
import {FetchGet} from '../actions/actions'





export class Iselect extends Component {

	constructor(props) {
		super(props)

		this.state = {
			opened: false,
			search: '',
			value: this.props.value ? this.props.value : '',
			text: '请选择',
			data: this.props.datalist ? this.props.datalist : []
		}

		this.timeout;

		//ES6 类中函数必须手动绑定
		this.handleClick = this.handleClick.bind(this)
		this.selectEvent = this.selectEvent.bind(this)
		this.mouseupCallback = this.mouseupCallback.bind(this)
		this.searchEvent = this.searchEvent.bind(this)

		document.addEventListener('mouseup', this.mouseupCallback)
	}

	componentWillMount() {

		document.addEventListener('mouseup', this.mouseupCallback)

		if (this.props.url) {
			FetchGet(this.props.url, {value: this.state.value}, (data) => {
				this.setState({
					data: data.list
				})
				let list = data.list
				for (let v of list) {
					if (this.props.value == v.id) {
						this.setState({
							text: v.name
						})
						break;
					}
				}
			})
		}
    }

	componentWillUnmount() {
		document.removeEventListener('mouseup', this.mouseupCallback)
	}

	handleClick(event) {
		this.setState({
			opened: !this.state.opened
		})
	}

	mouseupCallback(e) {
		this.setState({
			opened: false
		})
	}

	mouseupEvent(event) {
		event.nativeEvent.stopImmediatePropagation()
		event.stopPropagation()
	}

	selectEvent(event) {
		this.setState({
			opened: false,
			value: event.target.getAttribute('data-val'),
			text: event.target.textContent
		})
	}

	searchEvent(event) {

		const value = event.target.value;

		this.setState({
			search: value
		})

		clearTimeout(this.timeout)

		this.timeout = setTimeout(() => {
			FetchGet(this.props.url, {
				search: this.state.search
			}, (data) => {
				this.setState({
					data: data.list
				})
			})
		}, 800)

	}

	render() {
		const {name, className, value} = this.props
		const list = this.state.data
		let options = list.map((v, i) => {
			return <li key={i} data-val={v.id} onClick={this.selectEvent}>{v.name}</li>
		})

		let searchDom = this.props.url ? (<div className="iselect-search">
			<label className="input-append"><input name={"iselect" + name} onChange={this.searchEvent} type="text" value={this.state.search} /><span className="add-on"><i className="icon-magnifier"></i></span></label>
		</div>) : ''

        return (
			<div className={ 'iselect ' + className + (this.props.url ? '' : ' iselect-nosearch') + (this.state.opened ? ' open' : '')} onMouseUp={this.mouseupEvent}>
				<input name={name} type="hidden" value={this.state.value} ref='inputSelect' />
				<div className="iselect-handle" onClick={this.handleClick}></div>
				<div className="iselect-value" onClick={this.handleClick}>{this.state.text}</div>
				{searchDom}
				<ul>{options}</ul>
			</div>
        );
    }
}
