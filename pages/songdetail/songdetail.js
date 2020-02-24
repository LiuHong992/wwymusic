import api from '../../http/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 接收传过来的id用于数据请求
        ids: '',
        // 接收传过来的导航栏名字
        navName: '',
        // 接收数据的对象(简介)
        briefObj: {},
        // 接收背景图的参数
        bgImg: '',
        // 接收专辑歌曲的数组
        albumsArr: [],
        // 导航栏数据
        navArr: [{
                pathes: '../../assets/images/comment.png',
                titles: '评论'
            },
            {
                pathes: '../../assets/images/share.png',
                titles: '分享'
            },
            {
                pathes: '../../assets/images/download.png',
                titles: '下载'
            },
            {
                pathes: '../../assets/images/check.png',
                titles: '多选'
            },
        ]
    },
    // 对传过来的id进行相应的请求
    getMainData() {
        wx.showLoading({
            title: '加载中...'
        });
        if (this.data.navName === '歌单') {
            this.recommend()
        } else {
            this.albums()
        }
    },
    // 传过来的关键词是歌单的方法
    recommend() {
        api.detailsByRec(this.data.ids).then(res => {
            if (res.code === 200) {
                wx.hideLoading();
                this.data.briefObj = res.playlist
                this.collCounts(this.data.briefObj)
                this.data.bgImg = res.playlist.backgroundCoverUrl
                this.data.albumsArr = res.playlist.tracks
                this.setData({
                    briefObj: this.data.briefObj,
                    bgImg: this.data.bgImg,
                    albumsArr: this.data.albumsArr
                })
                console.log(this.data.briefObj);
            } else {
                wx.hideLoading();
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 传过来的关键词是专辑的方法
    albums() {
        api.detailByAlbum(this.data.ids).then(res => {
            if (res.code === 200) {
                wx.hideLoading();
                this.data.briefObj = res.album
                this.collCounts(this.data.briefObj)
                this.data.albumsArr = res.songs
                this.data.bgImg = res.album.blurPicUrl
                this.setData({
                    briefObj: this.data.briefObj,
                    albumsArr: this.data.albumsArr,
                    bgImg: this.data.bgImg
                })
            } else {
                wx.hideLoading();
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 收藏次数的计算方法
    collCounts(items) {
        if (items.subscribedCount >= 100000000) {
            let one = (items.subscribedCount / 100000000).toFixed(2)
            return items.subscribedCount = `${one}亿`
        } else if (items.subscribedCount < 100000000 && items.subscribedCount >= 10000) {
            let one = (items.subscribedCount / 10000).toFixed(1)
            return items.subscribedCount = `${one}万`
        } else {
            return items.subscribedCount = `${items.subscribedCount}`
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            ids: options.id,
            navName: options.detailname
        })
        if (this.data.navName !== '') {
            this.getMainData();
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