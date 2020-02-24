// components/search/hotSearch/hotSearch.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        hotArr: {
            type: Array,
            value: () => []
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
        // 子组件分发事件回给子组件
        changeValues(e) {
            let { item } = e.currentTarget.dataset
            this.triggerEvent('changeValues', item.searchWord)
        }
    }
})