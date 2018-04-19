import React, { Component } from 'react'

import {
	connect
} from 'react-redux'


//引入Action创建函数
import {FetchGet} from '../actions/actions'


const UploadFile = (params) => {

	let {inputFile, progress, complete, error, abort} = params

	const uploadProgress = (event) => {
		if (event.lengthComputable) {
			if (progress) {
				progress({
					loaded: event.loaded,
					total: event.total,
					percent: Math.round(event.loaded * 100 / event.total)
				})
			}
		}
	}

	const uploadComplete = (event) => {
		if (complete) complete(JSON.parse(event.target.responseText))
	}

	const uploadFailed = (event) => {

	}

	const uploadCanceled = (event) => {

	}




	let data = new FormData()

	data.append('file', inputFile)

	let xhr = new XMLHttpRequest()
	xhr.upload.addEventListener("progress", uploadProgress, false)
	xhr.addEventListener("load", uploadComplete, false)
	xhr.addEventListener("error", uploadFailed, false)
	xhr.addEventListener("abort", uploadCanceled, false)

	xhr.open("POST", "/api/media/upload")
	xhr.send(data)

}

export class Upload extends Component {

	constructor(props) {
		super(props)

		this.state = {
			list: [], //上传中的文件列表
			queue: 0,
			isLoading: false
		}

		this.timeout;

		//ES6 类中函数必须手动绑定
		this.chooseFileEvent = this.chooseFileEvent.bind(this)
		this.onChangeEvent = this.onChangeEvent.bind(this)
		this.upload = this.upload.bind(this)

	}

	chooseFileEvent(e) {
		this.refs.inputFile.click()
		// console.log('upload-choose');
	}

	onChangeEvent(e) {
		// console.log('upload-change');
		//
		this.setState({
			isLoading: true
		})

		let list  = []
		let files  = e.target.files

		//遍历多选
		for (let i = 0; i < files.length; i++) {

			let file = files[i]
			let reader = new FileReader()

			//如果是图片类型
			if (/image\/\w+/.test(file.type)) {
				reader.readAsDataURL(file)
				reader.onload =  (e) => {
					//向原有文件列表中添加新文件
                    list[i] = {
						name: file.name,
						type: file.type,
						total: file.size,
						loaded: 0,
						data: e.target.result
					}
					this.upload(file, i) //开始上传
					this.setState({
						list: list,
						queue: this.state.queue + 1 //上传队列加1
					})
                }
			} else {
				//向原有文件列表中添加新文件
				list[i] = {
					name: file.name,
					type: file.type,
					total: file.size,
					loaded: 0,
				}
				this.upload(file, i) //开始上传
				this.setState({
					list: list,
					queue: this.state.queue + 1 //上传队列加1
				})
			}
		}
	}

	upload(file, key) {
		UploadFile({
			inputFile: file,
			progress: (prams) => {
				if (this.state.list[key]) {
					Object.assign(this.state.list[key], prams)
					this.setState({
						list: this.state.list
					})
				}
			},
			complete: (data) => {
				if (this.state.list[key]) {
					Object.assign(this.state.list[key], {
						id: data.info.id,
						data: '/' + data.info.path + '/' + data.info.name
					})
					this.setState({
						list: this.state.list,
						queue: this.state.queue - 1 //上传队列减 1
					})
					if (this.state.queue < 1 && this.props.complete) {
						this.props.complete(this.state.list)
					}
				}
			}
		})
	}

	render() {

		const list = this.state.list

		let lists = list.map((v, i) => {

			let imgs

			if (/image\/\w+/.test(v.type)) {
				imgs = <div className="img-box"><img src={v.data} /></div>
			} else {
				imgs = <span><i className="icon-doc"></i><br />{v.name}</span>
			}

			let percent = v.percent

			return (
				<li key={i}>
					{imgs}
					<div className="loading"><div className="bar" style={{width: percent + '%'}}></div></div>
					<div className="text">{v.loaded + ' / ' + v.total}</div>
				</li>
			)
		})

        return (
			<div className="upload">
				<div className="upload-file" onClick={this.chooseFileEvent}>
					<ul className="upload-item" style={{display: list.length ? 'block' : 'none'}}>
						{lists}
					</ul>
					<div className="upload-input" style={{display: list.length ? 'none' : 'block'}}>
						<input type="file" multiple="multiple" style={{'display':'none'}} onChange={this.onChangeEvent} ref='inputFile' name="files" />
						<i className="icon-cloud-upload"></i><br />选择要上传的文件
					</div>
				</div>
			</div>
        );
    }
}
