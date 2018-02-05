import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Query from '../../tools/query.js'
import Validator from '../../tools/validator.js'

//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入弹出提示组件
import {Popup} from '../../components/popup'
import {OuSelect} from '../../components/select'
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

class OuListUI extends Component {

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



export const OuList = connect(
	(state) => {
		return {
			...state.oulist
		}
	},
	(dispatch, ownProps) => {

		return {
			getList: (where) => {
				console.log("getlist:ou where", where)
				dispatch(ActionGet(GET_ARTICLE_LIST, '/api/ou/list' ,where, 'oulist'))
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
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, configs, 'oulist'))
			},
			//单选框
			checkEvent: (list) => {
				//更新store配置
				dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, list, 'oulist'))
			},
			deleteEvent: (id) => {
				//删除一条
				dispatch(ActionGet(DELETE_ARTICLE, '/api/ou/del/' + id, 'oulist'))
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
						dispatch(ActionGet(DELETE_ARTICLE, '/api/ou/del/' + idArray.join(','), 'oulist'))
						break;
					case '1':
						dispatch(ActionGet(UPDATE_ARTICLE_STATE, '/api/ou/edit_state/' + idArray.join(','), {state: 1}, 'oulist'))
						break;
					case '2':
						dispatch(ActionGet(UPDATE_ARTICLE_STATE, '/api/ou/edit_state/' + idArray.join(','), {state: 0}, 'oulist'))
						break;
					default:
				}

			}
		};
	}
)(OuListUI)



class OuFormUI extends Component {

	constructor(props) {
		super(props)

		this.state = {
			id: '',
			name: '',
			ou_id: 1,
			path: '',
			desp: '',
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
	                <div className="page-bar-left">新增部门</div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="form-box">
					<form className="form" name="adminform">
						<input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} />
						<section className="section">
							<h3 className="section-head">新增部门</h3>
							<div className="control">
								<span className="control-label">名称：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><span className="add-on"><i className="icon-user"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">上级部门：</span>
								<div className="controls">
									<OuSelect name="ou_id" value={this.state.ou_id} parent='all' search="" className="inline-span4" />
								</div>
							</div>
							<div className="control">
								<span className="control-label">描述：</span>
								<div className="controls">
									<textarea className="inline-span8" name="desp" value={this.state.desp} onChange={this.handleChange} />
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


export const OuForm = connect(
	(state) => {
		return {
			isFetching: state.oulist.isFetching,
			info: state.oulist.info
		}
	},
	(dispatch, ownProps) => {
		return {
			getInfo: (id) => {
				dispatch(ActionGet(GET_ARTICLE_INFO, '/api/ou/view/' + id, 'oulist'))
			},
			submit: (formdata, callback) => {
				let url = '/api/ou/edit'

				if (formdata.id !== '') {
					url += '/' + formdata.id
				}

				dispatch(ActionPost(POST_ARTICLE_INFO, url, formdata, 'oulist', callback))
			}
		};
	}
)(OuFormUI)
