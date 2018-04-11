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




export class Uploads extends Component {

	constructor(props) {
		super(props)

		this.state = {
			path: [], // 已上传文件
			list: [], //上传中的文件
			isLoading: false
		}

		this.timeout;

		//ES6 类中函数必须手动绑定
		this.chooseFileEvent = this.chooseFileEvent.bind(this)
		this.onChangeEvent = this.onChangeEvent.bind(this)

	}

	componentWillMount() {

    }

	componentWillUnmount() {

	}

	chooseFileEvent(e) {
		this.refs.inputFile.click()
		// console.log('upload-choose');
	}

	onChangeEvent(e) {
		// console.log('upload-change');

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
						size: file.size,
						loaded: 0,
						data: e.target.result
					}
					this.setState({
						list: list
					})
                }
			} else {
				//向原有文件列表中添加新文件
				list[i] = {
					name: file.name,
					type: file.type,
					size: file.size,
					loaded: 0,
				}
				this.setState({
					list: list
				})
			}

			UploadFile({
				inputFile: file,
				progress: (prams) => {
					if(this.state.list[i]) {
						this.state.list[i] = {
							...prams,
							...this.state.list[i]
						}
						this.setState()
					}
				},
				complete: (data) => {
					console.log("complete ", data);
					let newPath = this.state.path
					newPath.push({
						id: data.info.id,
						data: data.info.path + '/' + data.info.name
					})
					this.setState({
						path: newPath
					})
				}
			})
		}




	}

	render() {

		let {path, list} = this.state

		console.log(path, list);

		let paths = path.map((v, i) => {
			let content = /image\/\w+/.test(v.type) ? <img src={v.data} /> : <p><i className="icon-doc"></i><span>{v.name}</span></p>
			return (<div key={i} className="upload-item">{content}</div>)
		})

		let lists = list.map((v, i) => {
			let content = /image\/\w+/.test(v.type) ? <img src={v.data} /> : <p><i className="icon-doc"></i><span>{v.name}</span></p>
		return (<div key={i} className="upload-item">{content}<span className="loading">{v.loaded + '/' + v.size}</span></div>)
		})

        return (
			<div className="upload">
				<div className='upload-view show'>
					{paths}{lists}
				</div>
				<div className="upload-add-file" onClick={this.chooseFileEvent}>
					<input type="file" multiple="multiple" style={{'display':'none'}} onChange={this.onChangeEvent} ref='inputFile' name="files" />
					<i className="icon-cloud-upload"></i><br />选择要上传的文件
				</div>
			</div>
        );
    }
}


export class Upload extends Component {

	constructor(props) {
		super(props)

		this.state = {
			path: [], // 已上传文件
			list: [], //上传中的文件
			isLoading: false
		}

		this.timeout;

		//ES6 类中函数必须手动绑定
		this.chooseFileEvent = this.chooseFileEvent.bind(this)
		this.onChangeEvent = this.onChangeEvent.bind(this)

	}

	chooseFileEvent(e) {
		this.refs.inputFile.click()
		// console.log('upload-choose');
	}

	onChangeEvent(e) {
		// console.log('upload-change');

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
						size: file.size,
						loaded: 0,
						data: e.target.result
					}
					this.setState({
						list: list
					})
                }
			} else {
				//向原有文件列表中添加新文件
				list[i] = {
					name: file.name,
					type: file.type,
					size: file.size,
					loaded: 0,
				}
				this.setState({
					list: list
				})
			}

			UploadFile({
				inputFile: file,
				progress: (prams) => {
					if(this.state.list[i]) {
						this.state.list[i] = {
							...prams,
							...this.state.list[i]
						}
						this.setState()
					}
				},
				complete: (data) => {
					console.log("complete ", data);
					let newPath = this.state.path
					newPath.push({
						id: data.info.id,
						data: data.info.path + '/' + data.info.name
					})
					this.setState({
						path: newPath
					})
				}
			})
		}
	}

	render() {
        return (
			<div className="upload">
				<div className="upload-add-file" onClick={this.chooseFileEvent}>
					<input type="file" multiple="multiple" style={{'display':'none'}} onChange={this.onChangeEvent} ref='inputFile' name="files" />
					<i className="icon-cloud-upload"></i><br />选择要上传的文件
				</div>
			</div>
        );
    }
}
