import store from '../../../store/index'
import create from '../../../utils/store/create'
create.Component(store, {
    use: ['afterSearch'],
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        contentHeight: 0
    },
    // 定义的全局样式在子组件里面生效
    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        // 滚到底部
        toBottom() {
            this.triggerEvent('toBottom', true)
        },
        // 动态获取高度
        // getHeight() {
        //     var me = this;
        //     const query = wx.createSelectorQuery().in(me);
        //     query.select('#singleconts').boundingClientRect(function(res) {
        //         me.setData({
        //             contentHeight: wx.getSystemInfoSync().windowHeight
        //         })
        //     }).exec()
        //     console.log(contentHeight);
        // },
    },
    lifetimes: {
        attached: function() {
            // 在组件实例进入页面节点树时执行
            // this.getHeight();
        },
    }
})