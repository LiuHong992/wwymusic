import api from '../../http/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 接收传过来的id值
        playId: '',
        // 接收请求出来的音源信息
        songRes: {}
    },
    // 根据传过来的id请求音源
    getSongres() {
        api.getMusicUrl(this.data.playId).then(res => {
            if (res.code === 200) {
                this.setData({
                        songRes: res.data[0]
                    })
                    // console.log(this.data.songRes);
                this.getPlayer(this.data.songRes)
            }
        }).catch(err => {
            console.log(err);
        });
    },
    // 获取音乐播放实例
    getPlayer(items) {
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        backgroundAudioManager.title = '测试'
        backgroundAudioManager.epname = '测试'
        backgroundAudioManager.singer = '毛不易'
        backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
            // 设置了 src 之后会自动播放
        backgroundAudioManager.src = items.url
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            playId: options.sid
        })
        if (this.data.playId !== '') {
            this.getSongres()
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