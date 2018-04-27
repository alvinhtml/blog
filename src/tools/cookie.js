export class Cookie {
    set(name, value, params) {
        let cookie = name + "=" + escape(value)
        if (params && params.path) {
            cookie += ';path=' + params.path
        }
        if (params && params.expires) {
            let expires = new Date()
            expires.setTime(expires.getTime() + params.expires * 24 * 60 * 60 * 1000)
            cookie += ";expires=" + expires.toGMTString()
        }
        document.cookie = cookie
    }

    get(name) {
        let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
        let arr = document.cookie.match(reg)
        if (arr) {
            return unescape(arr[2])
        } else {
            return null
        }
    }

    del(name) {
        let exp = new Date()
        exp.setTime(exp.getTime() - 1)
        let cval = this.get(name)
        if (cval != null) {
            document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString()
        }
    }
}
