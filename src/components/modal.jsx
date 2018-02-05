import React, { Component } from 'react'

export class Modalbox extends Component {

	constructor(props) {
		super(props)
	}

	render() {

		return (<div></div>)
	}
}
export const modal = (content = '', title = '提示信息') => {

	//背景
	let dimmer = document.createElement("div")
		dimmer.className = "dimmer"

	//弹出框
	let modalbox = document.createElement("div")
		modalbox.className = "modal animate"
		modalbox.innerHTML = `<span class="modal-close close">×</span>
			<div class="header">${title}</div>
			<div class="content">${content}</div>
			<div class="actions">
				<span class="button green close">知道了</span>
			</div>`

	document.body.appendChild(dimmer)
	document.body.appendChild(modalbox)


	//计算弹出框位置
	let width = modalbox.offsetWidth
	let height = modalbox.offsetHeight

	modalbox.style = `margin-left: ${- width / 2}px; margin-top: ${- height / 2}px; display: block`
	modalbox.className += " visible"
	dimmer.className += " visible"
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
