//引入redux createStore、中间件及 compose
import { createStore, applyMiddleware, compose } from 'redux'

//redux-thunk 支持 dispatch function，并且可以异步调用它
import thunk from 'redux-thunk'

//利用 redux-logger 打印日志
import { createLogger } from 'redux-logger'

// 安装 redux-devtools-extension 的可视化工具
import { composeWithDevTools } from 'redux-devtools-extension'



//调用日志打印方法
const loggerMiddleware = createLogger()

//创建一个中间件集合
const middleware = [thunk, loggerMiddleware]

//利用 compose 增强 store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
const finalCreateStore = compose(
    applyMiddleware(...middleware),
    composeWithDevTools()
)(createStore)

export default finalCreateStore
