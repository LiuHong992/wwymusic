import api from '../../http/api'
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['songsources'],
    /**
     * 页面的初始数据
     */
    data: {
        // 接收vuex中音源src
        playSrc: '',
        // 接收vuex中音源信息
        songRes: {}
    },
    // 获取音乐播放实例
    getPlayer(items) {
        const backgroundAudioManager = wx.getBackgroundAudioManager()
            // 歌曲名
        backgroundAudioManager.title = items.name
            // 专辑名
        backgroundAudioManager.epname = items.album.name
            // 歌手名
        backgroundAudioManager.singer = items.artists[0].name
            // 封面图
        backgroundAudioManager.coverImgUrl = items.album.blurPicUrl
            // 设置了 src 之后会自动播放
            // 音源
        backgroundAudioManager.src = this.data.playSrc
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this.store.data
        if (options.sid === '1') {
            this.setData({
                playSrc: that.songsources[that.songsources.length - 1].srcs,
                songRes: that.songsources[that.songsources.length - 1].song
            })
        } else {
            that.songsources.map(item => {
                if (item.id == options.sid) {
                    this.setData({
                        playSrc: item.srcs,
                        songRes: item.song
                    })
                }
            })
        }
        console.log(this.data.songRes);
        if (this.data.songRes.id) {
            this.getPlayer(this.data.songRes)
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})