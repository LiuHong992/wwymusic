Component({
    /**
     * 组件的属性列表
     */
    properties: {
        playlists: {
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
        // 跳转到歌单页
        goToPlaylists(e) {
            let { item } = e.currentTarget.dataset
            wx.navigateTo({
                url: `/pages/songdetail/songdetail?id=${item.id}&detailname=歌单`
            });
        }
    }
})