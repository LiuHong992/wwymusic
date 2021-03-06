Component({
    /**
     * 组件的属性列表
     */
    properties: {
        firstAlbum: {
            type: Object,
            value: () => {}
        },
        firstArtist: {
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
        // 跳转到专辑
        goToAlbumOne() {
            wx.navigateTo({
                url: `/pages/songdetail/songdetail?id=${this.data.firstAlbum.id}&detailname=专辑`
            });
        },
        // 跳转到歌手详情页
        goToSingerD() {
            wx.navigateTo({
                url: `/pages/siingerdetail/siingerdetail?id=${this.data.firstArtist.id}&name=${this.data.firstArtist.name}`
            });
        }
    }
})