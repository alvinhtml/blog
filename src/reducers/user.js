//引入action类型常量名
import {
    UPDATE_LIST_CONFIGS,
    CHANGE_LIST_CHECKBOX,
    GET_USER_LIST,
    GET_USER_INFO,
    POST_USER_INFO,
    DELETE_USER,
    UPDATE_USER_STATE
} from '../constants'


//初始化状态
const userInitialState = {
    isFetching: 0,
    error: 0,
    message: '',
    tools: [
        {
            text: '批量删除',
            icon: 'icon-close'
        },{
            text: '批量修改角色',
            icon: 'user-following'
        },{
            text: '批量修改状态',
            icon: 'user-following'
        }
    ],
    list: [], //列表数据
    info: null, //单条用户信息(用于查看和编辑)
    count: 64, //列表总条数
    //列表配置
    configs:{
        listPath: 'user',
        page: 1, //当前页
        limit: 20, //单页显示条数
        searchMode: 0, //搜索模式
        checkboxs: true, //选择框 0->无, 1->有
        checked: false, //false->无, all->全选, []->单多选
        search: '',
        order: [],
        column: [{
            key: 'photo',
            title: '用户头像',
            order: true,
            visibility: true,
            width: 120,
            resize: 1
        },{
            key: 'name',
            title: '用户名',
            order: true,
            visibility: true,
            width: 300,
            resize: 1
        },{
            key: 'email',
            title: '邮箱',
            order: true,
            visibility: true,
            width: 240,
            resize: 1
        },{
            key: 'type',
            title: '角色',
            order: true,
            visibility: true,
            width: 120,
            resize: 1
        },{
            key: 'state',
            title: '状态',
            order: true,
            visibility: true,
            width: 120,
            resize: 1
        }]
    }
}

export function user(state = userInitialState, action) {

    if (action.path !== "user") {
        return state
    }

    let ids = [], oldlist = []

    //根据不同的action type进行state的更新
    switch (action.type) {
        case GET_USER_LIST:
            action.payload.configs = {
                ...state.configs,
                ...action.payload.configs
            }
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_LIST_CONFIGS:
            let configs = {...state.configs, ...action.payload}
            return {...state, ...{configs}}
        case CHANGE_LIST_CHECKBOX:
            let list = [...action.payload]
            return {...state, list:[...list]}
        case GET_USER_INFO:
            return {...state, info: action.payload.info}
        case POST_USER_INFO:
            return {...state, ...action.payload}
        case DELETE_USER:
            ids = action.payload.ids
            oldlist = state.list
            if (ids) {
                for (let i = 0; i < ids.length; i++) {
                    for (let k = 0; k < oldlist.length; k++) {
                        if (ids[i] == oldlist[k].id) {
                            oldlist.splice(k, 1)
                        }
                    }
                }
            }
            return {...state, ...action.payload, list: [...oldlist]}
        case UPDATE_USER_STATE:
            ids = action.payload.ids
            oldlist = state.list
            if (ids) {
                for (let i = 0; i < ids.length; i++) {
                    for (let k = 0; k < oldlist.length; k++) {
                        if (ids[i] == oldlist[k].id) {
                            oldlist[k].state = action.payload.state
                        }
                    }
                }
            }
            return {...state, ...action.payload, list: [...oldlist]}
        default:
            return {...state}
    }
}
