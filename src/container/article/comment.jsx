import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Query from '../../tools/query.js'
import Editor from '../../tools/editor.js'
import Validator from '../../tools/validator.js'

//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入弹出提示组件
import {Popup} from '../../components/popup'

//引入文本编辑器组件
//import {Editor} from '../../components/editor'

import {Iselect} from '../../components/select'
import {Alert, Confirm} from '../../components/modal'
import {Radios, Radio} from '../../components/radios'
import {Tabs, Tab} from '../../components/tabs'

//引入组件
import {Crumbs, PageList, Searcher, Theader, Tbodyer, FetchButton, Additems, Addmedia} from '../../components/common'

//引入action类型常量名
import {
	GET_COMMENT_LIST,
	UPDATE_LIST_CONFIGS,
	CHANGE_LIST_CHECKBOX,
	GET_COMMENT_INFO,
	POST_COMMENT_INFO,
	DELETE_COMMENT,
	UPDATE_COMMENT_STATE
} from '../../constants'


//引入Action创建函数
import {ActionCreator, ActionGet, ActionPost, FetchPost} from '../../actions/actions'

class CommentListUI extends Component {

	constructor(props) {
		super(props)

		this.actions = [{
			type: 'link',
			href: '/admin/comment/form/{id}',
			name: '编辑',
			icon: 'icon-note',
			bgcolor: 'green'
		},{
			type: 'button',
			name: '删除',
			icon: 'icon-trash',
			bgcolor: 'red',
			buttonEvent: id => {
				this.props.deleteEvent(id)
			}
		}];

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
		switch(key) {
			case 'state':
				return value[key] == 1 ? <span className="color-green">已审核</span> : <span className="color-yellow">未审核</span>
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
						<div className="crumbs-first"><b>评论列表</b> / 首页</div>
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
                            <Link data-content="刷新" to="/admin/comment/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/comment/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
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



export const CommentList = connect(
	(state) => {
		return {
			...state.comment
		}
	},
	(dispatch, ownProps) => {

		return {
			getList: (where) => {
				console.log("getlist:ou where", where)
				dispatch(ActionGet(GET_COMMENT_LIST, '/api/comment/list' ,where, 'comment'))
			},
			//更新配置
			updateConfigs: (configs, isPost) => {
				//更新store配置
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, configs, 'comment'))
			},
			//单选框
			checkEvent: (list) => {
				//更新store配置
				dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, list, 'comment'))
			},
			deleteEvent: (id) => {
				//删除一条
				dispatch(ActionGet(DELETE_COMMENT, '/api/comment/del/' + id, 'comment'))
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
						dispatch(ActionGet(DELETE_COMMENT, '/api/comment/del/' + idArray.join(','), 'comment'))
						break;
					case '1':
						dispatch(ActionGet(UPDATE_COMMENT_STATE, '/api/comment/form_state/' + idArray.join(','), {state: 1}, 'comment'))
						break;
					case '2':
						dispatch(ActionGet(UPDATE_COMMENT_STATE, '/api/comment/form_state/' + idArray.join(','), {state: 0}, 'comment'))
						break;
					default:
				}

			}
		};
	}
)(CommentListUI)



class CommentFormUI extends Component {

	constructor(props) {
		super(props)

		this.state = {
			id: '',
			article_id: 1,
			name: '',
			email: '',
			url: '',
			content: '这是正文',
			state: ''
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

	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.info) {
			const {id, article_id, name, email, url, content, state} = nextProps.info
			this.setState({
		      id, article_id, name, email, url, content, state
		    })
			this.editor.setContent(content)
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
		const forms = document.forms.commentform
		const id = Query(forms.id).val()

		const formdata = {
			id: forms.id.value,
			article_id: Validator(forms.article_id),
			name: Validator(forms.name),
			email: forms.email.value,
			url: forms.url.value,
			content: forms.content.value,
			state: '0',
		}

		console.log(formdata)
		this.props.submit(formdata, (data) => {
			this.props.history.push('/admin/comment/list')
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
					<form className="form commentform" name="commentform">
						<input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} />
						<input type="hidden" name="article_id" value={this.state.article_id} onChange={this.handleChange} />
						<section className="section">
							<h3 className="section-head">{(this.state.id ? '修改' : '新增') + '评论'}</h3>
							<div className="control">
								<span className="control-label">名称：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><span className="add-on"><i className="icon-user"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">邮箱：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /><span className="add-on"><i className="icon-envelope-open"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">网址：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="url" value={this.state.url} onChange={this.handleChange} /><span className="add-on"><i className="icon-globe"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">评论：</span>
								<div className="controls">
									<textarea className="inline-span10" name="content" value={this.state.content} onChange={this.handleChange} />
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


export const CommentForm = connect(
	(state) => {
		return {
			isFetching: state.comment.isFetching,
			info: state.comment.info
		}
	},
	(dispatch, ownProps) => {
		return {
			getInfo: (id) => {
				dispatch(ActionGet(GET_COMMENT_INFO, '/api/comment/info/' + id, 'comment'))
			},
			submit: (formdata, callback) => {
				let url = '/api/comment/form'

				if (formdata.id !== '') {
					url += '/' + formdata.id
				}
				dispatch(ActionPost(POST_COMMENT_INFO, url, formdata, 'comment', callback))
			}
		};
	}
)(CommentFormUI)
