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


const UploadFile = (params) => {

	let {inputFile, progress, complete, error, abort} = params

	let data = new FormData()

	data.append('file', inputFile)

	let xhr = new XMLHttpRequest()
	xhr.upload.addEventListener("progress", uploadProgress, false)
	xhr.addEventListener("load", uploadComplete, false)
	xhr.addEventListener("error", uploadFailed, false)
	xhr.addEventListener("abort", uploadCanceled, false)

	xhr.open("POST", "/api/media/upload")
	xhr.send(data)

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
		alert(event.target.responseText);
		if (complete) complete()
	}

	const uploadFailed = (event) => {

	}

	const uploadCanceled = (event) => {

	}

}




export class Upload extends Component {

	constructor(props) {
		super(props)

		this.state = {
			filePath:[],
			fileData:[],
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
		console.log('upload-choose');
	}

	onChangeEvent(e) {
		console.log('upload-change');


		let fileList = []

		let files = e.target.files

		//遍历多选
		for (let i = 0; i < files.length; i++) {

			this.setState({
				isLoading: true
			})

			let file = files[i]
			let reader = new FileReader()

			//如果是图片类型
			if (/image\/\w+/.test(file.type)) {
				reader.readAsDataURL(file)
				reader.onload =  (e) => {
                    fileList[i] = {
						name: file.name,
						type: file.type,
						size: file.size,
						data: e.target.result
					}
                }
			} else {
				fileList[i] = {
					name: file.name,
					type: file.type,
					size: file.size
				}
			}

			UploadFile({
				inputFile: file,
				progress: (prams) => {

				},
				complete: (data) => {
					this.setState({
						isLoading: false,
						fileData: [{
							data: data.info.path + '/' + data.info.name
						}]
					})
				}
			})




		}




	}

	render() {

		let fileData = this.state.fileData

		console.log(fileData);

		let fileDataDom = fileData.map((v, i) => {
			return (<div key={i} className="upload-item file-type-img"><img src={v.data} /></div>)
		})



        return (
			<div className="upload">
				<div className={this.state.filePath.length > 0 ? 'upload-view show' : 'hide'}>
					{fileDataDom}
				</div>
				<div className="upload-add-file" onClick={this.chooseFileEvent}>
					<input type="file" multiple="multiple" style={{'display':'none'}} onChange={this.onChangeEvent} ref='inputFile' name="files" />
					<i className="icon-cloud-upload"></i><br />选择要上传的文件
				</div>
			</div>
        );
    }
}
