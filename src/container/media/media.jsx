import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Query from '../../tools/query.js'
import Validator from '../../tools/validator.js'

//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入弹出提示组件
import {Popup} from '../../components/popup'

//引入文本编辑器组件
//import {Editor} from '../../components/editor'

import {ClassifySelect} from '../../components/select'
import {Alert, Confirm} from '../../components/modal'
import {Radios, Radio} from '../../components/radios'

//引入组件
import {Crumbs, PageList, Searcher, Theader, Tbodyer, FetchButton} from '../../components/common'

//引入action类型常量名
import {
	GET_MEDIA_LIST,
	UPDATE_LIST_CONFIGS,
	CHANGE_LIST_CHECKBOX,
	GET_MEDIA_INFO,
	POST_MEDIA_INFO,
	DELETE_MEDIA,
	UPDATE_MEDIA_STATE
} from '../../constants'


//引入Action创建函数
import {ActionCreator, ActionGet, ActionPost, FetchPost} from '../../actions/actions'

class MediaListUI extends Component {

	constructor(props) {
		super(props)
		this.actions = []

		this.decorater = this.decorater.bind(this)
	}

	componentWillMount() {
		console.log("getlist:ou");
        this.props.getList({
			page: 1
		})
    }

	//值修饰器
	decorater(key, value) {
		let imgURL
		switch(key) {
			case 'preview':
				if (value[key]) {
					imgURL = '/' + value[key] + '/' + value['name']
				} else {
					imgURL = '/' + value['path'] + '/' + value['name']
				}
				return <div className="media_list_img"><img src={imgURL} alt={value['desp']} /></div>
			default:
				return value[key]
		}
	}

	render() {
		const {tools, actions, list, count, configs} = this.props
		const {
			toolsClickEvent,
			getList,
			updateConfigs,
			checkEvent
		} = this.props
		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left crumbs-box">
						<div className="crumbs-first"><b>媒体列表</b> / 首页</div>
						<div className="crumbs-arrow bg-orange"><i className="fa fa-angle-right"></i></div>
	                </div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="list-box">
					<div id="listHeader" className="olist-header clear">
                        <div className="olist-header-l">
                            <Droptool icon="icon-wrench" bgColor="bg-red">
								<Dropmenu options={tools} clickEvent={toolsClickEvent} />
                            </Droptool>
                            <Searcher getList={getList} updateConfigs={updateConfigs} configs={configs}></Searcher>
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/admin/media/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/media/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
                        </div>
                    </div>
					<div id="listTable" className="olist-main">
                        <table className="olist-table" id="olist_table">
							<Theader getList={getList} updateConfigs={updateConfigs} list={list} configs={configs}  actions={true} checkEvent={checkEvent} />
                            <Tbodyer updateConfigs={updateConfigs} list={list} configs={configs} actions={this.actions} checkEvent={checkEvent} decorater={this.decorater} />
                        </table>
                    </div>
					<PageList getList={getList} updateConfigs={updateConfigs} count={parseInt(count)} configs={configs} />
				</div>
            </div>
		)
	}
}



export const MediaList = connect(
	(state) => {
		return {
			...state.media
		}
	},
	(dispatch, ownProps) => {

		return {
			getList: (where) => {
				console.log("getlist:ou where", where)
				dispatch(ActionGet(GET_MEDIA_LIST, '/api/media/list' ,where, 'media'))
			},
			//更新配置
			updateConfigs: (configs, isPost) => {
				//更新store配置
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, configs, 'media'))
			},
			//单选框
			checkEvent: (list) => {
				//更新store配置
				dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, list, 'media'))
			},
			deleteEvent: (id) => {
				//删除一条
				dispatch(ActionGet(DELETE_MEDIA, '/api/media/del/' + id, 'media'))
			},
			toolsClickEvent: (value) => {
				let idArray = []
				let checkboxArray = Query("#list_body .input-checkbox:checked")
				checkboxArray.each((ii, element) => {
					idArray.push(element.value)
				})

				if (idArray.length === 0) {
					Alert("请先勾选要执行操作的列!")
					return false
				}

				switch (value) {
					case '0':
						dispatch(ActionGet(DELETE_MEDIA, '/api/media/del/' + idArray.join(','), 'media'))
						break;
					case '1':
						dispatch(ActionGet(UPDATE_MEDIA_STATE, '/api/media/edit_state/' + idArray.join(','), {state: 1}, 'media'))
						break;
					case '2':
						dispatch(ActionGet(UPDATE_MEDIA_STATE, '/api/media/edit_state/' + idArray.join(','), {state: 0}, 'media'))
						break;
					default:
				}

			}
		};
	}
)(MediaListUI)



class MediaFormUI extends Component {

	constructor(props) {
		super(props)

		this.state = {
			id: '',
			name: '',
			slug: '',
			type: 0,
		}

		//ES6 类中函数必须手动绑定
		this.handleChange = this.handleChange.bind(this)
		this.submitEvent = this.submitEvent.bind(this)
	}

	componentWillMount() {
        if(this.props.match.params.id) {
			this.props.getInfo(this.props.match.params.id)
		}
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.info) {
			const {id, name, slug, type} = nextProps.info
			this.setState({
		      id, name, slug, type
		    })
		//	this.editor.setContent(content)
		}
	}

	handleChange(e) {
	    const target = e.target
	    const value = target.type === 'checkbox' ? target.checked : target.value
	    const name = target.name
	    this.setState({
	      [name]: value
	    })
	}

	submitEvent(e) {
		const forms = document.forms.clissifyform
		const id = Query(forms.id).val()

		const formdata = {
			id: forms.id.value,
			name: Validator(forms.name),
			slug: Validator(forms.slug),
			type: 0,
		}

		console.log(formdata)
		this.props.submit(formdata, (data) => {
			this.props.history.push('/admin/media/list')
		})
	}

	render() {

		const {isFetching} = this.props

		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left"></div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="form-box">
					<form className="form clissifyform" name="clissifyform">
						<input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} />
							<section className="section">
								<h3 className="section-head">{(this.state.id ? '修改' : '新增') + '分类'}</h3>
								<div className="control">
									<span className="control-label">分类名：</span>
									<div className="controls">
										<label className="input-prepend labled inline-span6"><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><span className="add-on"><i className="icon-user"></i></span></label>
									</div>
								</div>
								<div className="control">
									<span className="control-label">别名：</span>
									<div className="controls">
										<label className="input-prepend labled inline-span6"><input type="text" name="slug" value={this.state.slug} onChange={this.handleChange} /><span className="add-on"><i className="icon-user"></i></span></label>
									</div>
								</div>
								<div className="control">
									<div className="controls">
										<FetchButton isFetching={isFetching} submitEvent={this.submitEvent} className="button green">提交</FetchButton>
									</div>
								</div>
							</section>
					</form>
				</div>
            </div>
		)
	}
}


export const MediaForm = connect(
	(state) => {
		return {
			isFetching: state.media.isFetching,
			info: state.media.info
		}
	},
	(dispatch, ownProps) => {
		return {
			getInfo: (id) => {
				dispatch(ActionGet(GET_MEDIA_INFO, '/api/media/info/' + id, 'media'))
			},
			submit: (formdata, callback) => {
				let url = '/api/media/form'

				if (formdata.id !== '') {
					url += '/' + formdata.id
				}

				dispatch(ActionPost(POST_MEDIA_INFO, url, formdata, 'media', callback))
			}
		};
	}
)(MediaFormUI)
