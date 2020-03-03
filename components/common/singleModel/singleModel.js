import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    use: ['songsources'],
    /**
     * 组件的属性列表
     */
    properties: {
        songes: {
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
        // 跳转播放页
        goToPlay(e) {
            let { item } = e.currentTarget.dataset
            let that = this.store.data
            let hadFlag = true
            that.songsources.map(itemOne => {
                if (itemOne.id === item.id) {
                    hadFlag = false
                }
            })
            if (hadFlag) {
                that.songsources.push(item)
                wx.navigateTo({
                    url: `../../pages/playdetail/playdetail?sid=1`
                });
            } else {
                wx.navigateTo({
                    url: `../../pages/playdetail/playdetail?sid=${item.id}`
                });
            }

        }
    }
})