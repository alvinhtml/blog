export class Editor {
    constructor(element, params) {

        //编辑器最外层容器
        this.editorbox = document.getElementById(element)

        //编辑模式 html/markdown
        this.mode = params.mode

        //html编写模式  text/code (文本/源码)
        this.htmlMode = 'text'

        //编辑器dom
        this.editorbox.innerHTML = `
            <div class="editor-box">
                <input type="hidden" name="{name}" value="{this.state.content}" />
                <div class="editor-tools clear" id="editorMenu">
                    <div class="editor-conf">
                        <div class="button tiny"><i class="icon-settings"></i></div>
                        <div class="dropdown-main">
                            <ul class="menu drop white">
                                <li class="active" id="modehtml"><a><i class="icon-check color-green"></i>文本模式</a></li>
                                <li id="modemarkdown"><a><i class="icon-check color-green"></i>Markdown 模式</a></li>
                                <li id="modescreenfull"><a><i class="icon-check color-green"></i>全屏编辑模式</a></li>
                            </ul>
                        </div>
                    </div>
                    <ul class="editor-tabs" id="modeHtmlTabs">
                        <li data-val="1" class="active" id="editorMenuText">文本</li>
                        <li data-val="2" id="editorMenuCode">源码</li>
                    </ul>
                    <ul class="editor-tabs" id="modeMarkdownTabs" style="display: none;">
                        <li data-val="2" id="editorMenuMarkdownCode" class="active">源码</li>
                        <li data-val="1" id="editorMenuMarkdownText">预览</li>
                    </ul>
                </div>
                <div class="editor-main">
                    <div class="editor-head" id="editorHead">
                        <div class="editor-btn-group row" id="editorAddons">
                            <button type="button" id="execBolde"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M9 17.025V13h4.418c1.19 0 2.415.562 2.415 2.012s-1.608 2.013-2.9 2.013H9zM9 7h4.336c1 0 1.814.888 1.814 2 0 .89-.814 2-1.814 2H9V7zm8.192 1.899a3.893 3.893 0 0 0-3.888-3.889S9.334 5 8.167 5C7 5 7 6.167 7 6.167v11.666C7 19 8.167 19 8.167 19l5.572.01c2.333 0 4.231-1.86 4.231-4.148a4.122 4.122 0 0 0-1.77-3.372 3.873 3.873 0 0 0 .992-2.591z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="execItalic"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M15.751 5h-5.502a.751.751 0 0 0-.749.75c0 .417.336.75.749.75H12l-2 11H8.249a.751.751 0 0 0-.749.75c0 .417.336.75.749.75h5.502a.751.751 0 0 0 .749-.75.748.748 0 0 0-.749-.75H12l2-11h1.751a.751.751 0 0 0 .749-.75.748.748 0 0 0-.749-.75" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="execHeader"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M7 6.007C7 5.45 7.444 5 8 5c.552 0 1 .45 1 1.007v11.986C9 18.55 8.556 19 8 19c-.552 0-1-.45-1-1.007V6.007zm8 0C15 5.45 15.444 5 16 5c.552 0 1 .45 1 1.007v11.986C17 18.55 16.556 19 16 19c-.552 0-1-.45-1-1.007V6.007zM9 11h6v2H9v-2z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="execBlockquote"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M17.975 12.209c.504.454.822 1.05.952 1.792.061.35.055.715-.022 1.096-.075.379-.209.718-.4 1.018-.465.73-1.155 1.175-2.07 1.337-.874.153-1.684-.06-2.432-.638a3.6 3.6 0 0 1-.916-1.043 3.92 3.92 0 0 1-.506-1.336c-.172-.98-.03-2.026.425-3.142.455-1.116 1.155-2.118 2.1-3.007.8-.757 1.456-1.182 1.97-1.273a.72.72 0 0 1 .544.104.656.656 0 0 1 .286.452c.054.31-.095.601-.45.877-.856.67-1.455 1.27-1.796 1.798-.323.513-.467.873-.43 1.079.034.196.21.287.524.274l.191-.001.249-.029a2.436 2.436 0 0 1 1.781.642zm-7.51 0c.504.454.821 1.05.951 1.792.062.35.056.715-.02 1.096-.077.379-.21.718-.401 1.018-.465.73-1.155 1.175-2.07 1.337-.874.153-1.684-.06-2.432-.638a3.6 3.6 0 0 1-.916-1.043 3.92 3.92 0 0 1-.506-1.336c-.172-.98-.03-2.026.424-3.142.455-1.116 1.156-2.118 2.101-3.007.8-.757 1.456-1.182 1.97-1.273a.72.72 0 0 1 .544.104.656.656 0 0 1 .285.452c.055.31-.094.601-.45.877-.855.67-1.454 1.27-1.796 1.798-.322.513-.466.873-.43 1.079.034.196.21.287.525.274l.191-.001.248-.029a2.436 2.436 0 0 1 1.782.642z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="execCode"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M19.718 11.559a.961.961 0 0 1 .007 1.352l-2.201 2.033-1.319 1.219a.937.937 0 0 1-1.33-.005.961.961 0 0 1-.001-1.345l2.813-2.576-2.804-2.568a.96.96 0 0 1-.008-1.352.963.963 0 0 1 1.337 0l2.475 2.289 1.031.953zm-7.462-5.567a1.001 1.001 0 0 1 1.16-.818c.544.096.907.616.81 1.165l-2.082 11.804a1.001 1.001 0 0 1-1.16.818 1.003 1.003 0 0 1-.81-1.165l2.082-11.804zM9.123 8.316a.96.96 0 0 1 0 1.345l-2.812 2.575 2.806 2.569a.962.962 0 0 1 .006 1.35.935.935 0 0 1-1.337 0l-2.093-1.934-1.412-1.305a.961.961 0 0 1-.007-1.352l2.833-2.62.685-.634c.345-.35.976-.354 1.331.006z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="execOrderedList"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M9 6.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 6.5zM5.884 7.893v-2.09h-.643L5.402 5h1.285v2.893h-.803zm.898 3.83l-.393.395h.862v.733H5v-.482l1.057-.892c.371-.312.461-.434.463-.566.003-.202-.135-.368-.396-.368-.289 0-.418.206-.418.43H5c0-.642.482-1.073 1.125-1.073s1.125.457 1.125.945c0 .307-.106.516-.468.877zM9 11.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01a.995.995 0 0 1-.995-1zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01a.995.995 0 0 1-.995-1zm-1.759.624c0 .14-.025.27-.076.388a.902.902 0 0 1-.217.309 1.017 1.017 0 0 1-.336.205c-.13.05-.275.074-.437.074-.166 0-.32-.027-.462-.08a1.166 1.166 0 0 1-.367-.217 1.062 1.062 0 0 1-.246-.318.914.914 0 0 1-.1-.38v-.055h.765v.054a.343.343 0 0 0 .367.352c.117 0 .207-.03.27-.09.062-.06.093-.152.093-.277 0-.117-.039-.206-.117-.268a.506.506 0 0 0-.32-.091h-.14v-.516h.144c.117 0 .205-.03.264-.09a.31.31 0 0 0 .087-.226.27.27 0 0 0-.087-.209.332.332 0 0 0-.233-.08c-.107 0-.185.027-.236.08a.275.275 0 0 0-.076.197v.055h-.695v-.055a.915.915 0 0 1 .295-.644c.178-.161.436-.242.775-.242.14 0 .27.021.39.064s.224.102.312.176a.802.802 0 0 1 .207.262c.05.1.075.206.075.318 0 .258-.116.46-.348.605v.008a.625.625 0 0 1 .193.119.777.777 0 0 1 .256.572z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="execUnorderedList"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M9 7c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 7zM6 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3-6c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 12zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 17z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="execLink"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M6.77 17.23c-.905-.904-.94-2.333-.08-3.193l3.059-3.06-1.192-1.19-3.059 3.058c-1.489 1.489-1.427 3.954.138 5.519s4.03 1.627 5.519.138l3.059-3.059-1.192-1.192-3.059 3.06c-.86.86-2.289.824-3.193-.08zm3.016-8.673l1.192 1.192 3.059-3.06c.86-.86 2.289-.824 3.193.08.905.905.94 2.334.08 3.194l-3.059 3.06 1.192 1.19 3.059-3.058c1.489-1.489 1.427-3.954-.138-5.519s-4.03-1.627-5.519-.138L9.786 8.557zm-1.023 6.68c.33.33.863.343 1.177.029l5.34-5.34c.314-.314.3-.846-.03-1.176-.33-.33-.862-.344-1.176-.03l-5.34 5.34c-.314.314-.3.846.03 1.177z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="execInsetPicture"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M21 17.444C21 18.3 20.1 19 19 19H5c-1.1 0-2-.7-2-1.556V6.556C3 5.7 3.9 5 5 5h14c1.1 0 2 .7 2 1.556v10.888zm-9.437-3.919a.5.5 0 0 1-.862.013l-1.26-2.065a.5.5 0 0 0-.861.012l-2.153 3.767a.5.5 0 0 0 .435.748h10.292a.5.5 0 0 0 .438-.741L14.573 9.78a.5.5 0 0 0-.872-.006l-2.138 3.75z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="exec2"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M10.546 15c-.466.273-.86.053-.86-.5V9.505c0-.565.385-.778.86-.501l4.278 2.497c.466.272.475.726 0 1.003L10.546 15zM5 5S3 5 3 7v10s0 2 2.002 2H19c2 0 2-2 2-2V7c0-2-2-2-2-2H5z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="exec3"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M9.033 16.182l3.083-4.133a.885.885 0 0 0 .003-1.12L9.033 6.817h7.985c.606-.03.982-.362.982-.92C18 5.34 17.611 5 17.018 5H6.922a.93.93 0 0 0-.83.509.882.882 0 0 0 .109.946L10 11.5l-3.782 5.037c-.29.289-.246.743-.122.974.172.316.455.489.799.489v-.211l.029.21h10.094c.501 0 .982-.32.982-.909 0-.59-.483-.857-.982-.908H9.033z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" class="editor-btn"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M4 7c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H5c-.552 0-1-.444-1-1zm0 5a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2H5.01C4.451 13 4 12.556 4 12zm6 0a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2h-1.98c-.558 0-1.01-.444-1.01-1zm6 0a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2h-1.98c-.558 0-1.01-.444-1.01-1zM4 17c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H5c-.552 0-1-.444-1-1z" fill-rule="evenodd"></path></svg></button>
                            <button type="button" id="execRemoveFormat"><svg class="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M9.864 12.83l1.641 1.642-1.171 2.874a1.693 1.693 0 0 1-1.585 1.055.782.782 0 0 1-.716-1.077l1.83-4.494zM11.5 8.811L12.24 7H9.69l-2-2h10.672a1 1 0 1 1 0 2h-3.813l-1.406 3.452L11.5 8.811zM5.293 6.845a1 1 0 0 1 1.414 0l10.046 10.046a1 1 0 0 1-1.414 1.414L5.293 8.26a1 1 0 0 1 0-1.415z" fill-rule="evenodd"></path></svg></button>
                        </div>
                    </div>
                    <div class="editor">
                        <div class="editor-text mui" id="contentEditable" contentEditable="true"></div>
                    </div>
                </div>
            </div>
        `
        // contenteditable="plaintext-only"

        //工具栏(按钮容器)
        this.addonsGroup = document.getElementById('editorAddons')

        //编辑框
        this.editor = document.getElementById('contentEditable')


        //内容
        this.value = ''

        //全屏状态
        this.full = false

        this.init()
        this.initMode(this.mode)

    }
}

Object.assign(Editor.prototype, {



    /*!
     * [init 初始化]
     * @return {[type]} [description]
     */
    init() {
        //html markdown 切换
        let modehtml = document.getElementById('modehtml')
        let modemarkdown = document.getElementById('modemarkdown')
        let modeHtmlTabs = document.getElementById('modeHtmlTabs')
        let modeMarkdownTabs = document.getElementById('modeMarkdownTabs')

        this.modehtml = modehtml
        this.modemarkdown = modemarkdown
        modehtml.onclick = (e) => {
            modeMarkdownTabs.style.display = 'none'
            modeHtmlTabs.style.display = 'block'
            modehtml.classList.add('active')
            modemarkdown.classList.remove('active')
            this.initHtmlTools()
        }
        modemarkdown.onclick = (e) => {
            modeHtmlTabs.style.display = 'none'
            modeMarkdownTabs.style.display = 'block'
            modemarkdown.classList.add('active')
            modehtml.classList.remove('active')
            this.initMarkdownTools()
        }

        //启动和退出全屏
        document.getElementById('modescreenfull').onclick = (e) => {
            let li = e.currentTarget
            if (this.full) {
                li.classList.remove('active')
                this.exitFullscreen(this.editorbox)
            } else {
                li.classList.add('active')
                this.launchFullScreen(this.editorbox)
            }
            this.full = ! this.full
        }

        let editor = this.editor

        //文本和源码切换
        let editorMenuText = document.getElementById('editorMenuText'),
            editorMenuCode = document.getElementById('editorMenuCode')


        const HTMLEncode = (html) => {
            var temp = document.createElement("div");
            (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
            var output = temp.innerHTML;
            temp = null;
            return output;
        }

        const HTMLDecode = (text) => {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        }

        //切换到文本
        editorMenuText.onclick = (e) => {
            editorMenuCode.classList.remove('active')
            editorMenuText.classList.add('active')
            this.value = editor.innerText
            editor.innerHTML = this.value
            editor.contentEditable = 'true'
        }

        //切换到源码
        editorMenuCode.onclick = (e) => {
            editorMenuText.classList.remove('active')
            editorMenuCode.classList.add('active')
            this.value = editor.innerHTML
            editor.innerText = this.value
            editor.contentEditable = 'plaintext-only'
        }


        //编辑框点击事件
        this.editor.onclick = (e) => {
            //获取选定对象
            this.selection = getSelection()
            //设置最后光标对象
            this.lastRange = this.selection.getRangeAt(0)
        }

        //编辑框按键弹起事件
        this.editor.onkeyup = () => {
            //获取选定对象
            this.selection = getSelection()
            //设置最后光标对象
            this.lastRange = this.selection.getRangeAt(0)
        }

        this.editor.onkeypress = (e) => {
            //获取选定对象
            this.selection = getSelection()
            //设置最后光标对象
            this.lastRange = this.selection.getRangeAt(0)
        }

    },


    /*!
     * [initMode 初始化编辑模式，用于启用和停用 markdown]
     * @return {[type]} [description]
     */
    initMode(mode) {
        if (mode === 'markdown') {
            this.modemarkdown.click()
        } else {
            this.modehtml.click()
        }
    },


    /*!
     * [initTools 初始化工具栏为HTML模式]
     * @return {[type]} [description]
     */
    initHtmlTools() {
        let editor = this.editor


        const hasTagName = (node,tag) => {
            while(node.tagName != tag) {
                if (node === this.editor) {
                    return false
                }
                node = node.parentNode
            }
            return true
        }


        this.addonsGroup.onclick = (e) => {

            if (!this.lastRange) {
                return false;
            }

            let target = e.target

            while (target.tagName != 'BUTTON') {
                if (target === e.currentTarget) {
    				return false
    			}
    			target = target.parentNode
            }

            //当前光标位置处的元素
            let node = this.lastRange.commonAncestorContainer

            switch (target.id) {

                //加粗
                case 'execBolde':
                    console.log(target.id);
                    document.execCommand('bold', false, null)
                    break;

                //斜体
                case 'execItalic':
                    console.log(target.id);
                    document.execCommand('italic', false, null)
                    break;

                //标题
                case 'execHeader':
                    if (hasTagName(node, "H3")) {
                        document.execCommand('formatBlock', false, 'div')
                    } else {
                        document.execCommand('formatBlock', false, 'h3')
                    }

                    break;

                //引用
                case 'execBlockquote':
                    if (hasTagName(node,"BLOCKQUOTE")) {
                        document.execCommand('formatBlock', false, 'div')
                    } else {
                        document.execCommand('formatBlock', false, 'blockquote')
                    }

                    break;

                //链接
                case 'execLink':
                    break;
                //插入图片
                case 'execInsetPicture':
                    if(this.upImgCallback && typeof this.upImgCallback === 'function') {
                        this.upImgCallback()
                    }
                    break;

                //有序
                case 'execOrderedList':
                    document.execCommand('insertOrderedList', false, null)
                    break;

                //无序
                case 'execUnorderedList':
                    document.execCommand('insertUnorderedList', false, null)
                    break;

                //去除格式
                case 'execRemoveFormat':
                    document.execCommand('removeFormat', false, null)
                    document.execCommand('formatBlock', false, 'div')
                    break;

                default:

            }

            editor.focus()
            //获取选定对象
            this.selection = getSelection()
            //设置最后光标对象
            this.lastRange = this.selection.getRangeAt(0)

        }
    },

    /*!
     * [initTools 初始化工具栏为markdown模式]
     * @return {[type]} [description]
     */
    initMarkdownTools() {

        if (!this.lastRange) {
            return false;
        }

        let editor = this.editor

        const hasTagName = (node,tag) => {
            while(node.tagName != tag) {
                if (node === this.editor) {
                    return false
                }
                node = node.parentNode
            }
            return true
        }

        this.addonsGroup.onclick = (e) => {

            let target = e.target

            while (target.tagName != 'BUTTON') {
                if (target === e.currentTarget) {
    				return false
    			}
    			target = target.parentNode
            }

            console.log(target.tagName);

            //当前光标位置处的元素
            let lastRange = this.lastRange
            let collapsed = lastRange.collapsed

            switch (target.id) {

                //加粗
                case 'execBolde':
                    if (collapsed) {
                        document.execCommand('insertText', false, '****')
                    } else {
                        document.execCommand('insertText', false, '**' + lastRange.toString() + '**')
                    }
                    editor.focus()
                    //获取选定对象
                    this.selection = getSelection()
                    //设置最后光标对象
                    this.lastRange = this.selection.getRangeAt(0)
                    this.lastRange.setEnd(this.lastRange.commonAncestorContainer, this.lastRange.endOffset - 2)
                    break;

                //斜体
                case 'execItalic':
                    if (collapsed) {
                        document.execCommand('insertText', false, '**')
                    } else {
                        document.execCommand('insertText', false, '*' + lastRange.toString() + '*')
                    }
                    editor.focus()
                    //获取选定对象
                    this.selection = getSelection()
                    //设置最后光标对象
                    this.lastRange = this.selection.getRangeAt(0)
                    this.lastRange.setEnd(this.lastRange.commonAncestorContainer, this.lastRange.endOffset - 1)
                    break;

                //标题
                case 'execHeader':
                    if (lastRange) {
                        if (lastRange.commonAncestorContainer.nodeName === '#text') {
                            let data = lastRange.commonAncestorContainer.data
                            if (/^#{1,6}\s/.test(data)) {
                                let newData = data.replace(/^#{1,6}\s/,'');
                                lastRange.commonAncestorContainer.nodeValue = newData
                            } else {
                                lastRange.commonAncestorContainer.nodeValue = '# ' + data
                            }
                        } else {
                            document.execCommand('insertText', false, '# ')
                        }
                    }
                    editor.focus()
                    //获取选定对象
                    this.selection = getSelection()
                    //设置最后光标对象
                    lastRange = this.selection.getRangeAt(0)
                    lastRange.setStart(lastRange.commonAncestorContainer, lastRange.commonAncestorContainer.length)
                    lastRange.setEnd(lastRange.commonAncestorContainer, lastRange.commonAncestorContainer.length)

                    break;

                //引用
                case 'execBlockquote':
                    if (lastRange) {
                        if (lastRange.commonAncestorContainer.nodeName === '#text') {
                            let data = lastRange.commonAncestorContainer.data
                            if (/^\>{1,6}\s/.test(data)) {
                                let newData = data.replace(/^\>{1,6}\s/,'');
                                lastRange.commonAncestorContainer.nodeValue = newData
                            } else {
                                lastRange.commonAncestorContainer.nodeValue = '> ' + data
                            }
                        } else {
                            document.execCommand('insertText', false, '> ')
                        }
                    }
                    editor.focus()
                    //获取选定对象
                    this.selection = getSelection()
                    //设置最后光标对象
                    lastRange = this.selection.getRangeAt(0)
                    lastRange.setStart(lastRange.commonAncestorContainer, lastRange.commonAncestorContainer.length)
                    lastRange.setEnd(lastRange.commonAncestorContainer, lastRange.commonAncestorContainer.length)

                    break;

                //链接
                case 'execLink':
                    break;

                //有序
                case 'execOrderedList':
                    if (lastRange) {
                        if (lastRange.commonAncestorContainer.nodeName === '#text') {
                            let data = lastRange.commonAncestorContainer.data
                            if (/^[1-9\*]\d*\.?\s/.test(data)) {
                                let newData = data.replace(/^[1-9\*]\d*\.?\s/,'');
                                lastRange.commonAncestorContainer.nodeValue = newData
                            } else {
                                lastRange.commonAncestorContainer.nodeValue = '1. ' + data
                            }
                        } else {
                            document.execCommand('insertText', false, '1. ')
                        }
                    }
                    editor.focus()
                    //获取选定对象
                    this.selection = getSelection()
                    //设置最后光标对象
                    lastRange = this.selection.getRangeAt(0)
                    lastRange.setStart(lastRange.commonAncestorContainer, lastRange.commonAncestorContainer.length)
                    lastRange.setEnd(lastRange.commonAncestorContainer, lastRange.commonAncestorContainer.length)

                    break;

                //无序
                case 'execUnorderedList':
                    if (lastRange) {
                        if (lastRange.commonAncestorContainer.nodeName === '#text') {
                            let data = lastRange.commonAncestorContainer.data
                            if (/^[1-9\*]\d*\.?\s/.test(data)) {
                                let newData = data.replace(/^[1-9\*]\d*\.?\s/,'');
                                lastRange.commonAncestorContainer.nodeValue = newData
                            } else {
                                lastRange.commonAncestorContainer.nodeValue = '* ' + data
                            }
                        } else {
                            document.execCommand('insertText', false, '* ')
                        }
                    }
                    editor.focus()
                    //获取选定对象
                    this.selection = getSelection()
                    //设置最后光标对象
                    lastRange = this.selection.getRangeAt(0)
                    lastRange.setStart(lastRange.commonAncestorContainer, lastRange.commonAncestorContainer.length)
                    lastRange.setEnd(lastRange.commonAncestorContainer, lastRange.commonAncestorContainer.length)

                    break;

                //去除格式
                case 'execRemoveFormat':

                    break;

                default:

            }

        }
    },

    /*!
     * [launchFullScreen 启用全屏]
     * @param  {[type]} element [要全屏显示的 html 元素]
     * @return {[type]}         [无]
     */
    launchFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    },



    /*!
     * [exitFullscreen 退出全屏]
     * @param  {[type]} element [要全屏显示的 html 元素]
     * @return {[type]}         [无]
     */
    exitFullscreen(element) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen){
            document.msExitFullscreen();
        }
    },


    /*!
     * [addUpImgCallback 绑定添加图片回调函数]
     * @param {[type]} content [description]
     */
    addUpImgCallback(cb) {
        this.upImgCallback = cb
    },
    insetPicture(data) {
        this.editor.focus()
        let htmlString = '<div class="blockquote image"><a href="' + data.path + '"><img src="' + data.path + '" alt="'+ data.id +'" /></a></div>'
        document.execCommand('insertHTML', false, htmlString)
    },

    /*!
     * [setContent 赋值要编辑的内容]
     * @param {[type]} content [description]
     */
    setContent(content) {
        this.value = content
        this.editor.innerHTML = this.value
    },


    /*!
     * [getContent 获取编辑内容]
     * @return {[type]} [description]
     */
    getContent() {
        this.value = this.editor.innerHTML
        return this.value
    },


    /*!
     * [getMode 获取当前编辑模式]
     * @return {[type]} [description]
     */
    getMode() {
        return this.mode
    }
})


const EditorInit = function(element, params) {
    return new Editor(element, params)
}

export default EditorInit
