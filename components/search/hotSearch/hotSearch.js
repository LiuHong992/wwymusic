import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    use: ['searchH'],
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
        // 子组件分发事件回给父组件
        changeValues(e) {
            let { item } = e.currentTarget.dataset
            this.triggerEvent('changeValues', item.searchWord)
        },
        // 删除搜索历史
        delHistory() {
            wx.showModal({
                title: '删除搜索历史',
                content: '您确定删除您的搜索历史吗？',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        this.store.data.searchH = []
                        wx.setStorageSync('sHistory', []);
                    }
                },
            });
        },
        // 点击搜索历史将搜索历史赋值给搜索框(分发事件)
        chooseHistory(e) {
            let { item } = e.currentTarget.dataset
            this.triggerEvent('chooseHistory', item)
        }
    }
})