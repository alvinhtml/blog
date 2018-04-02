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





export class Upload extends Component {

	constructor(props) {
		super(props)

		this.state = {
			filePath:[],
			fileData:[]
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

		let newFileData = this.state.fileData

		let files = e.target.files

		for (let i = 0; i < files.length; i++) {
			let file = files[i]
			let reader = new FileReader()



			//如果是图片类型
			if (/image\/\w+/.test(file.type)) {

				reader.readAsDataURL(file)

				reader.onload =  (e) => {
                    var data = e.target.result;
                    newFileData.push({
						name: file.name,
						type: file.type,
						size: file.size,
						data: data,
					})
					this.setState({
						fileData: newFileData
					})
                };

			} else {
				newFileData.push({
					name: file.name,
					type: file.type,
					size: file.size
				})
				this.setState({
					fileData: newFileData
				})
			}
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
					<div className="upload-item file-type-img">

					</div>
				</div>
				<div className="upload-add-file" onClick={this.chooseFileEvent}>
					<input type="file" multiple="multiple" style={{'display':'none'}} onChange={this.onChangeEvent} ref='inputFile' name="files" />
					<i className="icon-cloud-upload"></i><br />选择要上传的文件
				</div>
			</div>
        );
    }
}
