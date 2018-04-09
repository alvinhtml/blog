import React, { Component } from 'react'

export class Modal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false
		}

		this.hide = this.hide.bind(this)

	}

	componentDidMount() {
		this.modalbox = document.getElementById(this.props.id)
	}

	show() {
		//创建背景层
		this.dimmer = document.createElement("div")
		this.dimmer.className = "dimmer"
		document.body.appendChild(this.dimmer)

		//计算弹出框位置
		this.modalbox.style.display = 'block'

		let width = this.modalbox.offsetWidth
		let height = this.modalbox.offsetHeight

		this.modalbox.style.marginLeft = - (width / 2) + 'px'
		this.modalbox.style.marginTop = - (height / 2) + 'px'


		this.modalbox.className += " visible"
		this.dimmer.className += " visible"
	}

	hide() {
		this.modalbox.className = "modal animate"
		this.dimmer.className = "dimmer"
		setTimeout(()=>{
			document.body.removeChild(this.dimmer)
			this.modalbox.style.display = 'none'
		}, 300)
	}

	render() {
		let modalClass = this.state.visible ? "modal animate visible" : "modal animate"

		return (
			<div className={modalClass} id={this.props.id}>
				<span className="modal-close" onClick={this.hide}>×</span>
				{this.props.children}
			</div>
		)
	}
}

export const Confirm = (content = '', callback, title = '提示信息') => {

	//背景
	let dimmer = document.createElement("div")
		dimmer.className = "dimmer"

	//弹出框
	let modalbox = document.createElement("div")
		modalbox.className = "modal animate"
		modalbox.innerHTML = `<span class="modal-close close">×</span>
			<div class="modal-header">${title}</div>
			<div class="content">${content}</div>
			<div class="actions">
				<span class="button close">取消</span>
				<span class="button green label close confirm-button"><i class="fa fa-check"></i> 确认</span>
			</div>`

	document.body.appendChild(dimmer)
	document.body.appendChild(modalbox)

	modalbox.style = "display: block"

	//计算弹出框位置
	let width = modalbox.offsetWidth
	let height = modalbox.offsetHeight

	modalbox.style = `margin-left: ${- width / 2}px; margin-top: ${- height / 2}px; display: block`
	modalbox.className += " visible"
	dimmer.className += " visible"

	//点击关闭窗体
	dimmer.onclick = (e) => {
		modalbox.className = "modal animate"
		dimmer.className = "dimmer"
		setTimeout(()=>{
			document.body.removeChild(dimmer)
			document.body.removeChild(modalbox)
		}, 300)
	}

	//点击 close 关闭窗体
	modalbox.onclick = (e) => {
		if (e.target.classList.contains('confirm-button')) {
			callback()
		}
		if (e.target.classList.contains('close')) {
			modalbox.className = "modal animate"
			dimmer.className = "dimmer"
			setTimeout(()=>{
				document.body.removeChild(dimmer)
				document.body.removeChild(modalbox)
			}, 300)
		}
	}
}


export const Alert = (content = '', title = '提示信息') => {

	//背景
	let dimmer = document.createElement("div")
		dimmer.className = "dimmer"

	//弹出框
	let modalbox = document.createElement("div")
		modalbox.className = "modal animate"
		modalbox.innerHTML = `<span class="modal-close close">×</span>
			<div class="modal-header">${title}</div>
			<div class="content">${content}</div>
			<div class="actions">
				<span class="button green close">知道了</span>
			</div>`

	document.body.appendChild(dimmer)
	document.body.appendChild(modalbox)

	modalbox.style = "display: block"

	//计算弹出框位置
	let width = modalbox.offsetWidth
	let height = modalbox.offsetHeight

	modalbox.style = `margin-left: ${- width / 2}px; margin-top: ${- height / 2}px; display: block`
	modalbox.className += " visible"
	dimmer.className += " visible"

	//点击关闭窗体
	dimmer.onclick = (e) => {
		modalbox.className = "modal animate"
		dimmer.className = "dimmer"
		setTimeout(()=>{
			document.body.removeChild(dimmer)
			document.body.removeChild(modalbox)
		}, 300)
	}

	//点击 close 关闭窗体
	modalbox.onclick = (e) => {
		let target = e.target
		if (e.target.classList.contains('close')) {
			modalbox.className = "modal animate"
			dimmer.className = "dimmer"
			setTimeout(()=>{
				document.body.removeChild(dimmer)
				document.body.removeChild(modalbox)
			}, 300)
		}
	}
}
