//引入action类型常量名
import {
    UPDATE_LIST_CONFIGS,
    CHANGE_LIST_CHECKBOX,
    GET_CLASSIFY_LIST,
    GET_CLASSIFY_INFO,
    POST_CLASSIFY_INFO,
    DELETE_CLASSIFY,
    UPDATE_CLASSIFY_STATE
} from '../constants'


//初始化状态
const classifyInitialState = {
    isFetching: 0,
    error: 0,
    message: '',
    tools: [
        {
            text: '删除',
            icon: 'icon-close'
        }
    ],
    list: [], //列表数据
    info: null, //单条管理员信息(用于查看和编辑)
    count: 0, //列表总条数
    //列表配置
    configs:{
        listPath: 'classify',
        page: 1, //当前页
        limit: 20, //单页显示条数
        searchMode: 0, //搜索模式
        checkboxs: true, //选择框 0->无, 1->有
        checked: false, //false->无, all->全选, []->单多选
        search: '',
        order: [],
        column: [{
            key: 'id',
            title: '序号',
            order: true,
            visibility: true,
            width: 60,
            resize: 0
        },{
            key: 'name',
            title: '名称',
            order: true,
            visibility: true,
            width: 200,
            resize: 1
        },{
            key: 'slug',
            title: '别名',
            order: true,
            visibility: true,
            width: 200,
            resize: 1
        },{
            key: 'type',
            title: '类型',
            order: true,
            visibility: true,
            width: 120,
            resize: 1
        }]
    }
}

export function classify(state = classifyInitialState, action) {

    if (action.path !== "classify") {
        return state
    }

    let ids = [], oldlist = []

    //根据不同的action type进行state的更新
    switch (action.type) {
        case GET_CLASSIFY_LIST:
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
        case GET_CLASSIFY_INFO:
            return {...state, info: action.payload.info}
        case POST_CLASSIFY_INFO:
            return {...state, ...action.payload}
        case DELETE_CLASSIFY:
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
        case UPDATE_CLASSIFY_STATE:
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
