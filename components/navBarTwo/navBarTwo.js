// components/navBarTwo/navBarTwo.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        navName: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    // 定义的全局样式在子组件里面生效
    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        // 返回按钮
        backTo() {
            wx.navigateBack({
                delta: 1
            });
        }
    }
})