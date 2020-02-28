import api from '../../http/api'
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['myUid'],
    /**
     * 页面的初始数据
     */
    data: {
        // 用于接收Storage中存储的uid
        // myUid: '',
        // 接收用户等级
        userLevel: 0,
        // 接收请求到的用户信息
        userInfo: {},
        // 第二层导航栏
        secBar: [{
                titles: '动态'
            },
            {
                titles: '关注'
            },
            {
                titles: '粉丝'
            },
            {
                titles: '编辑资料'
            }
        ]
    },
    // 未登录跳转去登录页
    gotoLogin() {
        wx.navigateTo({
            url: '../login/login'
        });
    },
    // 根据获取到的uid对用户信息进行请求
    getUserInfo() {
        api.getUserInfo(this.store.data.myUid).then(res => {
            if (res.code === 200) {
                this.setData({
                    userInfo: res.profile,
                    userLevel: res.level
                })
            }
        }).catch(err => {
            console.log(err);
        });
    },
    // 退出登录按钮
    loginOut() {
        wx.removeStorageSync('uid');
        this.store.data.myUid = ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // if (!wx.getStorageSync('uid')) {
        //     wx.setStorageSync('uid', '');
        // } else 
        if (this.store.data.myUid === '') {
            this.store.data.myUid = wx.getStorageSync('uid');
            console.log(this.store.data.myUid);
            if (this.store.data.myUid !== '') {
                this.getUserInfo()
            }
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