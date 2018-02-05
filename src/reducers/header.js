//引入action类型常量名
import {
    GET_AUTH_INFO
} from '../constants'


//初始化状态
const headerInitialState = {
    reminds: [
        {
            text: '消息提醒1'
        },{
            text: '消息提醒2'
        },{
            text: '消息提醒3'
        },{
            text: '消息提醒4'
        }
    ],
    messages: [
        {
            text: '邮件提醒1'
        },{
            text: '邮件提醒2'
        },{
            text: '邮件提醒3'
        },{
            text: '邮件提醒4'
        }
    ],
    tasks: [
        {
            text: '待办事项1'
        },{
            text: '待办事项2'
        },{
            text: '待办事项3'
        },{
            text: '待办事项4'
        }
    ],
    avatar: 'http://laravel.xuehtml.com/public/images/admin.png',
    adminActions: [
        {
            text: '个人中心',
            link: '/api/admin/logout'
        },{
            text: '管理员列表',
            link: '/api/admin/logout'
        },{
            text: '修改密码',
            link: '/api/admin/logout'
        },{
            text: '退出登录',
            link: '/api/admin/logout'
        }
    ]
}

export function header(state = headerInitialState, action) {

    //根据不同的action type进行state的更新
    switch (action.type) {
        default:
            return { ...state }
    }
}
