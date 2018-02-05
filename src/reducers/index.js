//利用combineReducers合并reducers
import { combineReducers } from 'redux'

//将routerReducer一起合并管理
import { routerReducer } from 'react-router-redux'

//引入reducer
import {common} from './common'
import {header} from './header'
import {user} from './user'
// import {article} from './article'
// import {media} from './media'
// import {view} from './view'




export default combineReducers({
	/* your reducers */
	common, //登录相关
	header, //头部相关
	user, //管理员列表
	//article, //终端列表
	//media, //部门列表
	//view, //视图

    routing: routerReducer
})
