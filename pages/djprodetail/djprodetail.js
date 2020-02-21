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
        // 接收请求出来的数据
        detailObj: {},
        // 控制点击的详情还是节目的参数(同时控制下划线的出现)
        djNum: 1,
        // 接收歌曲详情的数组
        songsArr: []
    },
    // 传过来的关键词是电台或者节目的方法
    radioPro() {
        api.detailByDjProgram(this.data.ids).then(res => {
            if (res.code === 200) {
                wx.hideLoading();
                this.data.detailObj = res.program
                this.data.songsArr = this.properties.detailObj.songs
                this.setData({
                    detailObj: this.data.detailObj,
                    songsArr: this.data.songsArr
                })
                console.log(this.data.songsArr);
            } else {
                wx.hideLoading();
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 点击详情时触发的方法
    changeNum() {
        this.setData({
            djNum: 0
        })
    },
    // 点击电台时触发的方法
    changeNums() {
        this.setData({
            djNum: 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.detailname
        });
        this.setData({
            ids: options.id,
            navName: options.detailname
        })
        if (this.data.navName !== '') {
            this.radioPro();
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