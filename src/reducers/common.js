//引入action类型常量名
import {
    LOGIN,
    LOGOUT,
    GET_AUTH_INFO,
    GET_OU_IN_COMPONENT
} from '../constants'


//初始化状态
const commonInitialState = {
    logined: 0,
    renew_csrf_token: 0,
    isFetching: 0,
    error: 0,
    version: '10.0.106',
    logo: 'http://project.xuehtml.com/react-redux/src/images/login-logo.png',
    logoname: "画方科技",
    message: '',
    classifyList: [{
        id: 0,
        name: '分类'
    },{
        id: 1,
        name: '标签'
    }],
    roleList: [{
        id: 0,
        name: '管理员',
    },{
        id: 1,
        name: '作者',
    },{
        id: 2,
        name: '编辑'
    },{
        id: 3,
        name: '投搞者'
    },{
        id: 4,
        name: '订阅者'
    }],
    userStateList: [{
        id: 0,
        name: '启用'
    },{
        id: 1,
        name: '停用'
    },{
        id: 2,
        name: '未审核'
    }],
    commentStateList: [{
        id: 0,
        name: '分类'
    },{
        id: 1,
        name: '标签'
    }],
}

export function common(state = commonInitialState, action) {

    if (action.path !== "common") {
        return state
    }

    //根据不同的action type进行state的更新
    switch (action.type) {
        case LOGIN:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...state, ...action.payload}
        case GET_AUTH_INFO:
            return {...state, ...action.payload}
        case GET_OU_IN_COMPONENT:
            return {...state, ...action.payload}
        default:
            return { ...state }
    }
}
