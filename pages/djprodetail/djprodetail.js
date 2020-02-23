import api from '../../http/api'
var time = require('../../utils/util');
import store from '../../store/index'
import create from '../../utils/store/create'
create.Page(store, {
    use: ['commentLimit'],
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
        djNum: 0,
        // 接收歌曲详情的数组
        songsArr: [],
        // 接收精彩评论的数组
        hotComment: []
    },
    // 传过来的关键词是电台或者节目的方法
    radioPro() {
        api.detailByDjProgram(this.data.ids).then(res => {
            if (res.code === 200) {
                wx.hideLoading();
                this.data.detailObj = res.program
                if (res.program.songs.length > 0) {
                    this.data.songsArr = res.program.songs
                } else {
                    this.data.songsArr.push(res.program.mainSong)
                }
                if (this.data.songsArr.length > 0) {
                    this.data.songsArr.map(item => {
                        if (item.album.publishTime > 0) {
                            item.album.publishTime = time.formatTimeTwo(item.album.publishTime, 'Y-M-D')
                        } else {
                            item.album.publishTime = '暂无发布时间'
                        }
                        item.bMusic.playTime = time.formatTimeTwo(item.bMusic.playTime, 'm:s')
                    })
                }
                this.setData({
                    detailObj: this.data.detailObj,
                    songsArr: this.data.songsArr
                })
                console.log(this.data.detailObj);
            } else {
                wx.hideLoading();
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 传过来的id请求相应的评论
    getComment() {
        api.djproComment(this.data.ids, this.store.data.commentLimit).then(res => {
            if (res.code === 200) {
                if (res.hotComments.length > 0) {
                    this.data.hotComment = res.hotComments
                } else {
                    this.data.hotComment = res.comments
                }
                this.data.hotComment.map(item => {
                    item.time = time.formatTimeTwo(item.time, 'Y-M-D h:m:s')
                })
                this.setData({
                    hotComment: this.data.hotComment
                })
                console.log(this.data.hotComment);
            }
        }).catch(err => {
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
            this.getComment();
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