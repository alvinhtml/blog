import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Query from '../../tools/query.js'
import Validator from '../../tools/validator.js'

//引入下拉菜单组件
import {Droptool} from '../../components/dropdown'

//引入弹出提示组件
import {Popup} from '../../components/popup'
import {OuSelect} from '../../components/select'
import {Alert, Confirm} from '../../components/modal'
import {Radios, Radio} from '../../components/radios'

//引入组件
import {Crumbs, PageList, Searcher, Theader, Tbodyer, FetchButton} from '../../components/common'

//引入action类型常量名
import {
	GET_USER_LIST,
	UPDATE_LIST_CONFIGS,
	CHANGE_LIST_CHECKBOX,
	GET_USER_INFO,
	POST_USER_INFO,
	DELETE_USER,
	UPDATE_USER_STATE
} from '../../constants'


//引入Action创建函数
import {ActionCreator, ActionGet, ActionPost, FetchPost} from '../../actions/actions'

class UserListUI extends Component {

	constructor(props) {
		super(props)

		this.actions = [{
			type: 'link',
			href: '/admin/user/form/{id}',
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
		}]

		this.decorater = this.decorater.bind(this)
	}

	componentWillMount() {
        this.props.getList({
			page: 1
		})
    }

	//值修饰器
	decorater(key, value) {
		const {roleList, userStateList} = this.props
		switch(key) {
			case 'photo':
				return <img className="user_photo_little" src={value[key]} alt={value['name']} />
			case 'type':
				return <span>{roleList[value[key]].name}</span>
			case 'state':
				return <span>{userStateList[value[key]].name}</span>
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
						<div className="crumbs-first"><b>用户列表</b> / 首页</div>
	                </div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="list-box">
					<div id="listHeader" className="olist-header clear">
                        <div className="olist-header-l">
                            <Droptool className="dropdown tools bg-red" icon="icon-wrench" onChange={toolsClickEvent}>
								<ul className="menu drop">
									<li data-value="0"><a><i className="icon-close"></i>批量删除</a></li>
									<li data-value="1"><a><i className="icon-note"></i>批量修改角色</a></li>
									<li data-value="2"><a><i className="icon-note"></i>批量修改状态</a></li>
								</ul>
                            </Droptool>
                            <Searcher getList={getList} updateConfigs={updateConfigs} configs={configs}></Searcher>
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/admin/user/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/user/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
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



export const UserList = connect(
	(state) => {
		return {
			...state.user,
			roleList: state.common.roleList,
			userStateList: state.common.userStateList
		}
	},
	(dispatch, ownProps) => {

		return {
			getList: (where) => {
				dispatch(ActionGet(GET_USER_LIST, '/api/user/list' ,where, 'user'))
			},
			//更新配置
			updateConfigs: (configs, isPost) => {
				//更新store配置
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, configs, 'user'))
			},
			//单选框
			checkEvent: (list) => {
				//更新store配置
				dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, list, 'user'))
			},
			deleteEvent: (id) => {
				//删除一条
				dispatch(ActionGet(DELETE_USER, '/api/user/del/' + id, 'user'))
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
						dispatch(ActionGet(DELETE_USER, '/api/user/del/' + idArray.join(','), 'user'))
						break;
					case '1':
						//dispatch(ActionGet(UPDATE_USER_STATE, '/api/user/edit_state/' + idArray.join(','), {state: 1}, 'user'))
						break;
					case '2':
						//dispatch(ActionGet(UPDATE_USER_STATE, '/api/user/edit_state/' + idArray.join(','), {state: 0}, 'user'))
						break;
					default:
				}

			}
		};
	}
)(UserListUI)



class UserFormUI extends Component {

	constructor(props) {
		super(props)

		this.state = {
			id: '',
			name: '',
			email: '',
			photo: '',
			type: 0,
			state: 0,
			password: ''
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
			const {id, name, email, photo, type, state} = nextProps.info
			this.setState({
		      id, name, email, photo, type, state
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
		const forms = document.forms.userform
		const formdata = {
			id: forms.id.value,
			name: Validator(forms.name),
			email: Validator(forms.email),
			photo: forms.photo.value,
			type: Query(forms.type).val(),
			state: forms.state.value
		}

		if (formdata.id === "") {
			formdata.password = forms.password.value
		}

		console.log(formdata)
		this.props.submit(formdata, (data) => {
			this.props.history.push('/admin/user/list')
		})
	}

	render() {

		const {isFetching} = this.props

		const {roleList, userStateList} = this.props

		let roleOptions = roleList.map((v, i) => {
			return <option key={i} value={v.id}>{v.name}</option>
		})



		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left"></div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="form-box">
					<form className="form" name="userform">
						<input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} />
						<section className="section">
							<h3 className="section-head">{(this.state.id ? '修改' : '新增') + '用户'}</h3>
							<div className="control">
								<span className="control-label">用户名：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><span className="add-on"><i className="icon-user"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">密码：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input name="password" type="password" value={this.state.password} onChange={this.handleChange} /><span className="add-on"><i className="icon-lock"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">邮箱：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /><span className="add-on"><i className="icon-envelope-open"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">头像：</span>
								<div className="controls">
									<label className="input-append labled inline-span6"><input type="text" name="photo" value={this.state.photo} onChange={this.handleChange} /><span className="add-on"><i className="icon-camera"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">状态：</span>
								<div className="controls">
									<Radios name="state" value={this.state.state}>
										<Radio className="col-span1" value="0">启用</Radio>
										<Radio className="col-span1" value="1">停用</Radio>
										<Radio className="col-span1" value="2">未审核</Radio>
									</Radios>
								</div>
							</div>
							<div className="control">
								<span className="control-label">角色：</span>
								<div className="controls">
									<select name="type" value={this.state.type} onChange={this.handleChange} className="inline-span4">
										{roleOptions}
									</select>
								</div>
							</div>
							<div className="control">
								<div className="controls">
									<FetchButton isFetching={isFetching} submitEvent={this.submitEvent} className="button green">提-交</FetchButton>
								</div>
							</div>
						</section>
					</form>
				</div>
            </div>
		)
	}
}


export const UserForm = connect(
	(state) => {
		return {
			isFetching: state.user.isFetching,
			info: state.user.info,
			roleList: state.common.roleList,
			userStateList: state.common.userStateList
		}
	},
	(dispatch, ownProps) => {
		return {
			getUserInfo: (id) => {
				dispatch(ActionGet(GET_USER_INFO, '/api/user/info/' + id, 'user'))
			},
			submit: (formdata, callback) => {
				let url = '/api/user/form'

				if (formdata.id !== '') {
					url += '/' + formdata.id
				}

				dispatch(ActionPost(POST_USER_INFO, url, formdata, 'user', callback))
			}
		};
	}
)(UserFormUI)
