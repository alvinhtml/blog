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
import {Editor} from '../../components/editor'

import {ArticleSelect} from '../../components/select'
import {Alert, Confirm} from '../../components/modal'
import {Radios, Radio} from '../../components/radios'

//引入组件
import {Crumbs, PageList, Searcher, Theader, Tbodyer, FetchButton} from '../../components/common'

//引入action类型常量名
import {
	GET_ARTICLE_LIST,
	UPDATE_LIST_CONFIGS,
	CHANGE_LIST_CHECKBOX,
	GET_ARTICLE_INFO,
	POST_ARTICLE_INFO,
	DELETE_ARTICLE,
	UPDATE_ARTICLE_STATE
} from '../../constants'


//引入Action创建函数
import {ActionCreator, ActionGet, ActionPost, FetchPost} from '../../actions/actions'

class ArticleListUI extends Component {

	constructor(props) {
		super(props)

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
						<div className="crumbs-first"><b>日志列表</b> / 首页</div>
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
                            <Link data-content="刷新" to="/ou/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/ou/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
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



export const ArticleList = connect(
	(state) => {
		return {
			...state.article
		}
	},
	(dispatch, ownProps) => {

		return {
			getList: (where) => {
				console.log("getlist:ou where", where)
				dispatch(ActionGet(GET_ARTICLE_LIST, '/api/ou/list' ,where, 'article'))
			},
			//更新配置
			updateConfigs: (configs, isPost) => {
				if (isPost) {
					//更新数据库配置
					FetchPost('/api/setting/list_configs', {
						listPath: configs.listPath,
						configs: JSON.stringify(configs)
					})
				}
				//更新store配置
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, configs, 'article'))
			},
			//单选框
			checkEvent: (list) => {
				//更新store配置
				dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, list, 'article'))
			},
			deleteEvent: (id) => {
				//删除一条
				dispatch(ActionGet(DELETE_ARTICLE, '/api/ou/del/' + id, 'article'))
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
						dispatch(ActionGet(DELETE_ARTICLE, '/api/ou/del/' + idArray.join(','), 'article'))
						break;
					case '1':
						dispatch(ActionGet(UPDATE_ARTICLE_STATE, '/api/ou/edit_state/' + idArray.join(','), {state: 1}, 'article'))
						break;
					case '2':
						dispatch(ActionGet(UPDATE_ARTICLE_STATE, '/api/ou/edit_state/' + idArray.join(','), {state: 0}, 'article'))
						break;
					default:
				}

			}
		};
	}
)(ArticleListUI)



class ArticleFormUI extends Component {

	constructor(props) {
		super(props)

		this.state = {
			id: '',
			title: '',
			classify_id: 1,
			author: '',
			media: '',
			abstract: '',
			content: '',
			markdown: '',
			state: ''
		}

		//ES6 类中函数必须手动绑定
		this.handleChange = this.handleChange.bind(this)
		this.submitEvent = this.submitEvent.bind(this)
	}

	componentWillMount() {
        this.props.getInfo(this.props.match.params.id)
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.info) {
			const {id, name, ou_id, path, desp} = nextProps.info
			this.setState({
		      id, name, ou_id, path, desp
		    })
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
		const forms = document.forms.adminform
		const ou_id = Query(forms.ou_id).val()

		const formdata = {
			id: forms.id.value,
			name: Validator(forms.name),
			ou_id: ou_id,
			desp: Validator(forms.desp),
		}

		console.log(formdata)
		this.props.submit(formdata, (data) => {
			this.props.history.push('/ou/list')
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
					<form className="form articleform" name="articleform">
						<input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} />
						<div className="row">
							<div className="col-span9">
								<div className="row article-title-size">
									<label className="input-prepend labled inline-span12"><input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="请输入文章标题" /><span className="add-on"><i className="icon-notebook"></i></span></label>
								</div>
								<div className="row">
									<Editor value={this.state.content}></Editor>
								</div>
							</div>
							<div className="col-span3 article-sidebar">
								<section className="section">
									<h3 className="section-head">发布</h3>
									<div className="control">
										<span className="control-label">状态：</span>
										<div className="controls"><b>草稿</b></div>
									</div>
									<div className="control">
										<span className="control-label">作者：</span>
										<div className="controls"><b>Alvin</b></div>
									</div>
									<div className="control">
										<span className="button blue">发布</span>
										<span className="button teal">存草稿</span>
									</div>
								</section>
								<section className="section">
									<h3 className="section-head">分类</h3>
									<div className="row">
										<select name="" id="">
											<option value="1">文章分类1</option>
											<option value="2">文章分类2</option>
											<option value="3">文章分类3</option>
										</select>
									</div>
								</section>
								<section className="section">
									<h3 className="section-head">标签</h3>
									<div className="row">
										<select name="" id="">
											<option value="1">文章分类1</option>
											<option value="2">文章分类2</option>
											<option value="3">文章分类3</option>
										</select>
									</div>
								</section>
							</div>
						</div>
					</form>
				</div>
            </div>
		)
	}
}


export const ArticleForm = connect(
	(state) => {
		return {
			isFetching: state.article.isFetching,
			info: state.article.info
		}
	},
	(dispatch, ownProps) => {
		return {
			getInfo: (id) => {
				dispatch(ActionGet(GET_ARTICLE_INFO, '/api/article/info/' + id, 'article'))
			},
			submit: (formdata, callback) => {
				let url = '/api/ou/edit'

				if (formdata.id !== '') {
					url += '/' + formdata.id
				}

				dispatch(ActionPost(POST_ARTICLE_INFO, url, formdata, 'article', callback))
			}
		};
	}
)(ArticleFormUI)
