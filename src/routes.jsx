import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//引入各个容器组件
import {Login} from './container/user/login'
import {Home} from './container/home/home'

import {UserList, UserForm} from './container/user/user'
// import {TermList, TermForm} from './container/company/term'
// import {TermView} from './container/company/termview'
// import {OuList, OuForm} from './container/company/ou'

import {Header} from './container/common/header'
import {Sidebar} from './container/common/sidebar'

//引入Action创建函数
import {ActionGet} from './actions/actions'

//引入action类型常量名
import {
	GET_AUTH_INFO
} from './constants'


//引入cookie操作库
import Cookies from 'js-cookie'

class Manage extends Component {

    constructor(props) {
		super(props)

		let sidebar = Cookies.get("sidebar")

		if (!sidebar) {
			 Cookies.set("sidebar", "opened", { path: '/' })
			 sidebar = "opened"
		}

        this.sidebar = sidebar


	}

    render () {

		console.log(12);

        return (
            <div className={"manage " + this.sidebar} id="manage">
                <Header />
                <Sidebar />
                <Switch>
                    <Route exact path="/admin" component={Home}/>
                    <Route path="/admin/home" component={Home}/>
                    <Route path="/admin/user/form/:id" component={UserForm}/>
                    <Route path="/admin/user/form" component={UserForm}/>
					<Route path="/admin/user" component={UserList}/>
                </Switch>
            </div>
        )
    }
}

class AppUI extends Component {

    componentWillMount() {
        this.props.onWillMount();
    }

    render () {

		console.log(this.props.logined);

		return (
			<Router>
				<Switch>

					<Route key='/admin/login' path="/admin/login" render={(urls) => {
                        let url = urls.location.search.split("=")[1] || '/admin'
                        return this.props.logined ? <Redirect to={url} /> : <Login />
                    }} />

					<Route key='/admin' path="/admin" render={(urls) => {
                        let backurl = {
                            pathname: '/admin/login',
                            search: '?=' + urls.location.pathname
                        }
                        return this.props.logined ? <Manage /> : <Redirect to={backurl} />
                    }} />

                </Switch>
			</Router>
		)




        // return (
        //     <Router>
        //         <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={3000} transitionLeaveTimeout={3000}>
        //             <Switch>
        //                 <Route key='/admin' exact path="/admin" render={(urls) => {
        //                     let url = urls.location.search.split("=")[1]
        //                     return this.props.logined ? <Redirect to={url} /> : <Login />
        //                 }} />
        //
		// 				<Route key='/admin/login' path="/admin/login" render={(urls) => {
        //                     let backurl = {
        //                         pathname: '/admin/login',
        //                         search: '?=' + urls.location.pathname
        //                     }
        //                     return this.props.logined ? <Manage /> : <Redirect to={backurl} />
        //                 }} />
        //             </Switch>
        //         </ReactCSSTransitionGroup>
        //     </Router>
        // )
    }
}


const App = connect((state) => {
    return {logined: state.common.logined}
}, (dispatch) => {
    return {
        onWillMount: () => {
			dispatch(ActionGet(GET_AUTH_INFO, '/api/authinfo', 'common'))
		}
    };
})(AppUI)

export default App
