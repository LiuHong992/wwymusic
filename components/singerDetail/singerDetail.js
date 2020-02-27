// components/singerDetail/singerDetail.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        fiveSongs: {
            type: Array,
            value: () => []
        },
        singerinfo: {
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
        // 子组件分发回父组件的跳转操作事件
        changeNumOne() {
            this.triggerEvent('changeNumOne', 1)
        }
    }
})