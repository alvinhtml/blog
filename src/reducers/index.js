//利用combineReducers合并reducers
import { combineReducers } from 'redux'

//将routerReducer一起合并管理
import { routerReducer } from 'react-router-redux'

//引入reducer
import {common} from './common'
import {header} from './header'
import {user} from './user'
import {article} from './article'
import {classify} from './classify'
import {media} from './media'
import {comment} from './comment'
// import {view} from './view'




export default combineReducers({
	/* your reducers */
	common, //登录相关
	header, //头部相关
	user, //用户列表
	article, //文章列表
	classify, //文章分类列表
	media, //媒体列表
	comment, //评论列表

    routing: routerReducer
})
