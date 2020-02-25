// components/search/multiple/multiple.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        sResult: {
            type: Object,
            value: () => {}
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
        // 动态获取高度
        // getHeight() {
        //     var me = this;
        //     const query = wx.createSelectorQuery().in(me);
        //     query.select('#mcontents').boundingClientRect(function(res) {
        //         me.setData({
        //             contentHeight: wx.getSystemInfoSync().windowHeight - res.top
        //         })
        //     }).exec()
        // },
        // 滚到底部
        toBottom() {
            wx.showToast({
                title: '已经到最底部啦~'
            });
        }
    },
    lifetimes: {
        attached: function() {
            // 在组件实例进入页面节点树时执行
            // this.getHeight();
        },
    }
})