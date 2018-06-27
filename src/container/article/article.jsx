import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Query from '../../tools/query.js'
import Editor from '../../tools/editor.js'
import Validator from '../../tools/validator.js'

//引入下拉菜单组件
import {Droptool, Dropmenu} from '../../components/dropdown'

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

		this.actions = [{
			type: 'link',
			href: '/admin/article/form/{id}',
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
				return value[key] == 1 ? <span className="color-green">已发布</span> : <span className="color-yellow">草稿</span>
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
							<Droptool className="dropdown tools bg-red" icon="icon-wrench" onChange={toolsClickEvent}>
								<ul className="menu drop">
									<li data-value="0"><a><i className="icon-close"></i>批量删除</a></li>
								</ul>
                            </Droptool>
                            <Searcher getList={getList} updateConfigs={updateConfigs} configs={configs}></Searcher>
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/article/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/article/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
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
				dispatch(ActionGet(GET_ARTICLE_LIST, '/api/article/list' ,where, 'article'))
			},
			//更新配置
			updateConfigs: (configs, isPost) => {
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
				dispatch(ActionGet(DELETE_ARTICLE, '/api/article/del/' + id, 'article'))
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
						dispatch(ActionGet(DELETE_ARTICLE, '/api/article/del/' + idArray.join(','), 'article'))
						break;
					case '1':
						dispatch(ActionGet(UPDATE_ARTICLE_STATE, '/api/article/form_state/' + idArray.join(','), {state: 1}, 'article'))
						break;
					case '2':
						dispatch(ActionGet(UPDATE_ARTICLE_STATE, '/api/article/form_state/' + idArray.join(','), {state: 0}, 'article'))
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
			tags: [],
			abstract: '',
			content: '',
			markdown: 'html',
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
		this.editor = Editor('ArticleEditor', {
			mode: this.state.markdown
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.info) {
			const {id, title, classify_id, author, media, tags, abstract, content, markdown, state} = nextProps.info
			this.setState({
		      id, title, classify_id, author, media, tags, abstract, content, markdown, state
		    })
			//this.editor.setContent(content)
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
		const forms = document.forms.articleform
		const id = Query(forms.id).val()

		const formdata = {
			id: forms.id.value,
			title: Validator(forms.title),
			content: this.editor.getContent(),
			classify_id: forms.classify_id.value,
			tags: forms.tags.value,
			media: forms.media.value,
			markdown: this.editor.getMode(),
		}

		console.log(formdata)

		this.props.submit(formdata, (data) => {
			this.props.history.push('/admin/article/list')
		})
	}

	render() {

		const {isFetching} = this.props


		let {state, tags, media} = this.state

		let stateDom = state == 0 ? <b className="color-green">已发布</b> : <b className="color-yellow">草稿</b>

		const tagDataList = [{
			id: 0,
			name: '标签一'
		},{
			id: 1,
			name: '标签二'
		},{
			id: 2,
			name: '标签三'
		},{
			id: 3,
			name: '标签四'
		}]

		//id="editorInitBox"
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
									<div id="ArticleEditor" style={{width: '100%'}}></div>
								</div>
							</div>
							<div className="col-span3 article-sidebar">
								<section className="section">
									<h3 className="section-head">发布</h3>
									<div className="control">
										<span className="control-label">状态：</span>
										<div className="controls">{stateDom}</div>
									</div>
									<div className="control">
										<span className="control-label">作者：</span>
										<div className="controls"><b>{this.state.author}</b></div>
									</div>
									<div className="control-actions align-center">
										<span className="button blue" data-val="0" onClick={this.submitEvent}>发布</span>
										<span className="button teal" data-val="1" onClick={this.submitEvent}>存草稿</span>
									</div>
								</section>
								<section className="section">
									<h3 className="section-head">分类</h3>
									<div className="row">
										<Iselect className="col-span10" url="/api/classify/select_list" name="classify_id" value={this.state.classify_id}></Iselect>
									</div>
								</section>
								<section className="section">
									<h3 className="section-head">标签</h3>
									<div className="control">
										<Additems datalist={tags} name="tags" />
									</div>
								</section>
								<section className="section">
									<h3 className="section-head">媒体</h3>
									<Addmedia media={media} className="control" name="media" />
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
				console.log('getinfo');
				dispatch(ActionGet(GET_ARTICLE_INFO, '/api/article/info/' + id, 'article'))
			},
			submit: (formdata, callback) => {
				let url = '/api/article/form'

				if (formdata.id !== '') {
					url += '/' + formdata.id
				}

				dispatch(ActionPost(POST_ARTICLE_INFO, url, formdata, 'article', callback))
			}
		};
	}
)(ArticleFormUI)
