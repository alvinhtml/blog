import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux'

//引入样式文件
import './less/miniui.less'
import '..//public/css/style.css'


//引入Action创建函数
import {FetchPost} from './actions/actions'

//引入action类型常量名
import {
    UPDATE_LIST_CONFIGS
} from './constants'

//引入store配置
import finalCreateStore from './stores/configureStore'

//引入reducers集合
import reducer from './reducers/index'

//引入路由配置
import App from './routes'

//给增强后的store传入reducer
const store = finalCreateStore(reducer)


render(
    <Provider store={store}>
        <div>
            <App />
        </div>
    </Provider>,
document.getElementById('webApplication'))

//引入 Query
import Query from './tools/query.js'



//定义两个全局变量用来存放列表拖动时的信息
const resize = {
    resizeing: false
}
const remove = {
    moving: false
}
export {resize, remove}

const colmove = function (index) {
    let tds = Query("#olist_table tr td:nth-child(" + index + ")")
    tds.addClass("moving")
    return 1
}

//document mousemove 事件
document.addEventListener('mousemove', (e) => {

    //表头宽度调整
    if (resize && resize.resizeing) {
        let {event, configs, pageX, element, width, index} = resize
        let {column, listPath} = configs

        if (width + e.pageX - pageX > 60) {
            element.style.width = (width + e.pageX - pageX) + 'px'
        }
    }

    //表格拖动
    // NOTE: 用户按下拖动时, 先通过css opacity隐藏原表格支持拖动的列, 然后生成原表格每个列的镜像
    if (remove && remove.moving) {

        let {event, configs, mirrorArr, mirror, position, width, index, initial} = remove

        //鼠标向对于按下时在X轴上移动的距离
        let moveX = e.pageX - remove.pageX
        let mirrorLeft = (initial.left + (e.pageX - initial.pageX))

        mirror.style.top = position.top + 'px'
        mirror.style.left = mirrorLeft + 'px'

        //moveX>0 说明鼠标在向右移动, 设置 orientation=1 当前列将和后一列进行交换
        let orientation = moveX > 0 ? 1 : -1

        //index为当前列的索引, 当index为数组第一个元素, 或为数组最后一个元素, 都会禁止向前(<=0)和向后(>=length-1)的列拖动
        if (index + orientation < 0 || index + orientation >= mirrorArr.length) {
            return false;
        }

        //mirrorArr[index].position.left 是拖动目标最终left值
        //mirrorLeft是拖动目标实际left值
        if ( orientation > 0 ) {
            //当向右拖动时实际left值必须大于或等于最终left值, 才会叠加movex的值, 否则设置 remove.pageX = e.pageX
            if (mirrorArr[index].position.left > mirrorLeft) {
                remove.pageX = e.pageX
                return false
            }
        } else {
            //向左拖动
            if (mirrorLeft > mirrorArr[index].position.left) {
                remove.pageX = e.pageX
                return false
            }
        }

        //跳过隐藏的列
        let filterInvisible = () => {
            if (mirrorArr[index + orientation].mirror == null) {
                mirrorArr.splice(index, 0, mirrorArr.splice(index + orientation, 1)[0])
                remove.index = index + orientation
                filterInvisible()
            }
        }

        filterInvisible()



        //mirrorArr[index]是当前列
        //mirrorArr[index + orientation] 是要与当前列进行交换的列
        //moveX的绝对值代表距离, 只有在这个距离大于 mirrorArr[index + orientation] 宽的一半时才触发交换
        if (Math.abs(moveX) > mirrorArr[index + orientation].width / 2) {

            if ( orientation === 1 ) {
                //orientation=1 与后一列进行交换
                mirrorArr[index + orientation].mirror.style.left = mirrorArr[index].position.left + 'px'

                let left = mirrorArr[index].position.left + mirrorArr[index + orientation].width

                mirrorArr[index + orientation].position.left = mirrorArr[index].position.left

                mirrorArr[index].position.left = left

                remove.position.left = left
            } else if ( orientation === -1 ) {
                //orientation=-1 与前一列进行交换
                mirrorArr[index + orientation].mirror.style.left = (mirrorArr[index + orientation].position.left + mirrorArr[index].width) + 'px'

                let left = mirrorArr[index + orientation].position.left

                mirrorArr[index + orientation].position.left = (mirrorArr[index + orientation].position.left + mirrorArr[index].width)

                mirrorArr[index].position.left = left

                remove.position.left = left
            }

            remove.index = index + orientation
            remove.pageX = e.pageX

            mirrorArr.splice(index, 0, mirrorArr.splice(index + orientation, 1)[0])

        }
    }
})
document.addEventListener('mouseup', (e) => {
    if (resize && resize.resizeing) {
        let {event, configs, pageX, element, width, index} = resize
        let {column, listPath} = configs

        column[index].width = element.offsetWidth

        //更新store中的数据
        store.dispatch({
            type: UPDATE_LIST_CONFIGS,
            payload: {
                column: column
            },
            path: configs.listPath
        })

        resize.resizeing = false
    }

    if (remove && remove.moving) {
        let {event, configs, mirrorArr, mirror, position, width, index, initial} = remove


        mirror.className = "olist-table mirror"
        mirror.style.left = remove.position.left + 'px';

        let newColumn = []

        setTimeout(()=>{
            for (let i = 0; i < mirrorArr.length; i++) {
                newColumn.push(mirrorArr[i].column)
                if (mirrorArr[i].mirror) {
                    document.body.removeChild(mirrorArr[i].mirror)
                }
            }

            Query("#olist_table").removeClass("moving")

            //更新store中的数据
            store.dispatch({
                type: UPDATE_LIST_CONFIGS,
                payload: {
                    column: newColumn
                },
                path: configs.listPath
            })
        },300)

        remove.moving = false
    }

})
