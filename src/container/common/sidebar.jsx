import React, { Component } from 'react'

import {
	Link
} from 'react-router-dom'

import {
	connect
} from 'react-redux'

//引入cookie操作库
import Cookies from 'js-cookie'


class SidebarUI extends Component {

	constructor(props) {
		super(props)

		this.sidebar = Cookies.get("sidebar") || "opened"

		//ES6 类中函数必须手动绑定
		this.toggleEvent = this.toggleEvent.bind(this)
	}


	toggleEvent() {
		const manageElement = document.getElementById("manage")

		this.sidebar = this.sidebar === "opened" ? "closed" : "opened"

		manageElement.className = "manage " + this.sidebar

		Cookies.set("sidebar", this.sidebar, { path: '/' })
	}

	render() {
        return (
            <div className="sidebar-box">
	            <nav>
					<div className="sidebar-toggle" onClick={this.toggleEvent}><i className="icon-menu"></i></div>
	                <ul className="navigate">
	                    <li className="nav-item"><Link to="/admin/home" className="nav-link"><i className="icon-home"></i><span className="text">首页</span></Link></li>
	                    <li className="nav-item"><Link to="/admin/home" className="nav-link"><i className="icon-notebook"></i><span className="text">日志</span><span className="arrow"></span></Link>
							<ul className="sub-nav">
	                            <li className="nav-item"><Link to="/admin/article" className="nav-link">日志列表</Link></li>
	                            <li className="nav-item"><Link to="/admin/classify" className="nav-link">日志分类</Link></li>
	                            <li className="nav-item"><Link to="/admin/article/form" className="nav-link">写日志</Link></li>
	                        </ul>
						</li>
						<li className="nav-item"><Link to="/admin/media" className="nav-link"><i className="icon-camera"></i><span className="text">媒体</span><span className="arrow"></span></Link>
							<ul className="sub-nav">
								<li className="nav-item"><Link to="/admin/media" className="nav-link">媒体列表</Link></li>
	                            <li className="nav-item"><Link to="/admin/media/upload" className="nav-link">上传</Link></li>
	                        </ul>
						</li>
						<li className="nav-item"><Link to="/admin/comment" className="nav-link"><i className="icon-bubble"></i><span className="text">评论</span><span className="arrow"></span></Link>
							<ul className="sub-nav">
								<li className="nav-item"><Link to="/admin/comment" className="nav-link">评论列表</Link></li>
	                        </ul>
						</li>
	                    <li className="nav-item"><Link to="/admin/user" className="nav-link"><i className="icon-user"></i><span className="text">用户管理</span></Link></li>
	                    <li className="nav-item"><Link to="/admin/setting" className="nav-link"><i className="icon-settings"></i><span className="text">网站设置</span><span className="arrow"></span></Link></li>
	                </ul>
	            </nav>
	        </div>
        );
    }

}

export const Sidebar = connect(
	(state) => {
		return state.common
	},
	(dispatch, ownProps) => {
		return {
			submit: (o) => {
				//dispatch(loginFetch({email, password},'/common'))
			}
		};
	}
)(SidebarUI)
