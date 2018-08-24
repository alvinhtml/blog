import React, { Component } from 'react';

import {
	Link
} from 'react-router-dom';

import {
	connect
} from 'react-redux';

//引入下拉菜单组件
import {Dropmenu} from '../../components/dropdown'


//引入Action创建函数
import {ActionGet} from '../../actions/actions'

//引入action类型常量名
import {
	LOGOUT
} from '../../constants'

class HeaderUI extends Component {

	render () {

		const {reminds, messages, tasks, adminActions, adminname, adminemail, avatar, logined} = this.props
		const {remindClickEvent, messagesClickEvent, tasksClickEvent, logoutEvent} = this.props
			//console.log("8.1", common);

		if(logined !== true){

		}

        return (
            <div className="header">
	            <div className="logo-box">
	                <a><span>Alvin's</span>blog</a>
	            </div>
	            <div className="head-tools-box">
	                <ul className="head-tools">
						<li>
							<a className="toggler"><span className="avatar"><img src="/public/images/admin.png" /></span>{adminname}</a>
							<ul className="menu drop drop-right">
								<li><Link to="/admin/article/form"><i className="icon-notebook"></i>新建日志</Link></li>
								<li><Link to="/admin/comment"><i className="icon-bubbles"></i>管理评论</Link></li>
								<li><Link to="/admin/user"><i className="icon-people"></i>用户管理</Link></li>
								<li className="divider"> </li>
								<li><Link to="/admin/user"><i className="icon-lock"></i>修改密码</Link></li>
								<li><a onClick={logoutEvent}><i className="icon-key"></i>退出登录</a></li>
							</ul>
						</li>
					</ul>
	            </div>
	        </div>
        );
    }

}

// <li>
// 	<Dropdown icon="icon-bell" badge="6" badgeColor="teal">
// 		<Dropmenu options={reminds} clickEvent={remindClickEvent} />
// 	</Dropdown>
// </li>
// <li className="dropdown">
//     <Dropdown icon="icon-envelope-open" badge="27" badgeColor="red">
// 		<Dropmenu options={messages} clickEvent={messagesClickEvent} />
// 	</Dropdown>
// </li>
// <li className="dropdown">
// 	<Dropdown icon="icon-calendar" badge="3" badgeColor="green">
// 		<Dropmenu options={tasks} clickEvent={tasksClickEvent} />
// 	</Dropdown>
// </li>


export const Header = connect(
	(state) => {
		return {...state.header, ...state.common}
	},
	(dispatch, ownProps) => {
		return {
			remindClickEvent: (value) => {
				console.log("header remind click event",value)
			},
			messagesClickEvent: (value) => {
				console.log("header message click event",value)
			},
			tasksClickEvent: (value) => {
				console.log("header tasks click event",value)
			},
			logoutEvent: (value) => {
				dispatch(ActionGet(LOGOUT, '/api/admin/logout', 'common'))
			}
		};
	}
)(HeaderUI)
