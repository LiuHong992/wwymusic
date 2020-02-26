import api from '../../http/api'
import store from '../../store/index'
import create from '../../utils/store/create'
create.Page(store, {
    use: ['bigArr', 'initial', 'searchLimit'],
    /**
     * 页面的初始数据
     */
    data: {
        // 控制大分类的参数
        count: '5001',
        // 用于滚动到头部的参数
        startTo: '',
        // 接收小类的参数
        littleC: '',
        // 控制小分类的参数
        indexNum: 0,
        // 用于接收歌手数据的数组
        singerArr: []
    },
    // 大类分类的方法
    bigClassfys(littles) {
        let store = this.store.data
        wx.showLoading({
            title: '加载中...'
        });
        api.artist(store.searchLimit, this.data.count, littles).then(res => {
            if (res.code === 200) {
                wx.hideLoading();
                this.data.singerArr = res.artists
                this.setData({
                    singerArr: this.data.singerArr
                })
                console.log(this.data.singerArr);
            } else {
                wx.hideLoading();
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 更改大类的方法
    changeCountss(e) {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
        this.setData({
            count: e.detail.name,
            indexNum: 0,
            startTo: 'starts',
            littleC: ''
        })
        this.bigClassfys('')
    },
    // 点击小类触发的方法
    changeNum(e) {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
        let { item, index } = e.currentTarget.dataset
        this.setData({
            indexNum: index,
            littleC: item
        })
        if (index === 0) {
            this.bigClassfys('')
        } else {
            this.bigClassfys(this.data.littleC)
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.store.data.bigArr = api.typeList
        this.store.data.searchLimit = 30
        this.bigClassfys('')
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
        this.store.data.searchLimit += 23
        if (this.store.data.searchLimit < 100) {
            if (this.data.indexNum === 0) {
                this.bigClassfys('')
            } else {
                this.bigClassfys(this.data.littleC)
            }
        } else {
            wx.showToast({
                title: '没有更多数据了哦~',
                icon: 'none'
            });
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})