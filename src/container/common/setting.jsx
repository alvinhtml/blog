import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Query from '../../tools/query.js'
import Validator from '../../tools/validator.js'

//引入下拉菜单组件
import {Droptool} from '../../components/dropdown'

//引入弹出提示组件
import {Popup} from '../../components/popup'



//引入组件
import {Crumbs, PageList, Searcher, Theader, Tbodyer, FetchButton, MediaMain} from '../../components/common'


//引入Action创建函数

export class Setting extends Component {

	constructor(props) {
		super(props)

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
						<div className="crumbs-first"><b>网站设置</b> / 首页</div>
						<div className="crumbs-arrow bg-orange"><i className="fa fa-angle-right"></i></div>
	                </div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="form-box">
					
				</div>
            </div>
		)
	}
}
