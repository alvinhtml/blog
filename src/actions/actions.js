//引入isomorphic-fetch API来进行Ajax
import fetch from 'isomorphic-fetch'

/**
 * json to url
 * @param  {[json]} data json
 * @return {[string]}
 */
function formatParams(data) {
    var arr = [];
    for (let name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    return arr.join("&");
}



//Action Creators 生成器 [生成 action 函数, 不包含任何请求]
export const ActionCreator = (type, body, path) => {
    //因为使用了 redux-thunk 中间件, action 创建函数应当反回一个函数 (dispatch,getState) => {}
    return (dispatch, getState) => {
        dispatch({
            type: type,
            payload: body,
            path: path
        });
    }
}

//POST请求
export const FetchPost = (url, body, callback) => {

        //发起fetch请求
        return fetch(url, {
            method: "POST",
            //请求带上cookie
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': window.csrf_token
            },
            body: JSON.stringify({_token: window.csrf_token, ...body})
        })

        //判断HTTP请求结果，200-299 表示请求成功
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        })

        //生成JSON.parse(responseText)的结果
        .then(response => response.json())

        //获取并处理请求结果
        .then(json => {
            if (typeof callback === "function") {
                callback(json)
            }
        })

        //处理请求错误
        .catch(error => {
            //
        })
}

//异步Action函数创建器 GET请求
export const ActionGet = (type, url, ...args) => {

    let [body, path, callback] = [...args]

    if (typeof body === 'object') {
        url = url + '?' + formatParams(body)
    }

    if (typeof body === 'string') {
        callback = path
        path = body
    }


    return (dispatch, getState) => {

        //第一次dispatch, 表示将要发起fetch，Action创建函数会更新对应的isFetching为true
        dispatch({
            type: type,
            payload: {
                isFetching: true,
            },
            path: path
        })

        //发起fetch请求
        return fetch(url, {
            method: "GET",
            //请求带上cookie
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': window.csrf_token
            }
        })

        //判断HTTP请求结果，200-299 表示请求成功
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        })

        //生成JSON.parse(responseText)的结果
        .then(response => response.json())

        //获取并处理请求结果
        .then(json => {
            if (typeof callback === "function") {
                callback(json)
            }
            return dispatch({
                type: type,
                payload: {
                    isFetching: false,
                    ...json
                },
                path: path
            })
        })

        //处理请求错误
        .catch(error => {
            //
        })
    }
}

//异步Action函数创建器 POST请求
export const ActionPost = (type, url, body, path, callback) => {

    return (dispatch, getState) => {

        //第一次dispatch, 表示将要发起fetch，Action创建函数会更新对应的isFetching为true
        dispatch({
            type: type,
            payload: {
                isFetching: true,
            },
            path: path
        })
        //发起fetch请求
        return fetch(url, {
            method: "POST",
            //请求带上cookie
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': window.csrf_token
            },
            body: JSON.stringify({_token: window.csrf_token, ...body})
        })

        //判断HTTP请求结果，200-299 表示请求成功
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        })

        //生成JSON.parse(responseText)的结果
        .then(response => response.json())

        //获取并处理请求结果
        .then(json => {
            if (typeof callback === "function") {
                callback(json)
            }
            return dispatch({
                type: type,
                payload: {
                    isFetching: false,
                    ...json
                },
                path: path
            })
        })

        //处理请求错误
        .catch(error => {
            //
        })
    }
}
