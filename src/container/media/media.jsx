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
import {Crumbs, PageList, Searcher, Theader, Tbodyer, FetchButton, MediaMain} from '../../components/common'

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

class MediaSelectUI extends Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
        this.props.getList({
			page: 1
		})
    }

	render() {
		const {tools, actions, list, count, configs, getList} = this.props
		return (
			<div className="list-box media-select-box">
				<div className="media-select-main clear">
					<MediaMain list={list} selectEvent={this.props.selectEvent} />
				</div>
				<PageList getList={getList} count={parseInt(count)} configs={configs} />
			</div>
		)
	}
}

export const MediaSelect = connect(
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
			}
		};
	}
)(MediaSelectUI)
