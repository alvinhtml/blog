/*!
 * [DevTools: redux调试工具]
 * @type {[type]}
 */


import React from 'react'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTools = createDevTools(
    /**
     * DockMonitor 默认属性值
     * defaultIsVisible: true,
	 * defaultPosition: 'right',
	 * defaultSize: 0.3,
	 * fluid: true
     */
    <DockMonitor defaultIsVisible={false} toggleVisibilityKey="ctrl-h" changePositionKey='ctrl-q'>
        <LogMonitor />
    </DockMonitor>
)

export default DevTools
