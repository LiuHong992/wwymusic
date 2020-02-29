import api from '../../http/api'
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['myUid'],
    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        // 手机号
        telNum: null,
        // 手机号表单验证错误文案
        mobileMsg: '',
        // 邮箱
        emails: '',
        // 邮箱表单验证的错误文案
        emailMsg: '',
        // 密码
        password: '',
        // 密码表单验证错误文案
        // passMsg: ''
        // phones: 13981419660,
    },
    // 标签栏选中的方法
    changeActive(e) {
        this.setData({
            active: e.detail.name,
            mobileMsg: '',
            emailMsg: ''
        })
    },
    // 手机号输入框的方法
    onChangeNum(e) {
        if (e.detail.trim() !== '') {
            this.setData({
                telNum: e.detail,
                mobileMsg: ''
            })
        }
    },
    // 手机号验证方法
    mobileVerify(e) {
        if (e.detail.value.trim() !== '') {
            if (!(/^1[3456789]\d{9}$/.test(e.detail.value))) {
                this.setData({
                    mobileMsg: '请输入正确格式的手机号'
                })
            }
        } else {
            this.setData({
                mobileMsg: '请输入手机号'
            })
        }
    },
    // 邮箱输入框的方法
    onChangeEmail(e) {
        if (e.detail.trim() !== '') {
            this.setData({
                emails: e.detail,
                emailMsg: ''
            })
        }
    },
    // 邮箱验证方法
    emailVerify(e) {
        if (e.detail.value.trim() !== '') {
            if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e.detail.value))) {
                this.setData({
                    emailMsg: '请输入正确格式的邮箱'
                })
            }
        } else {
            this.setData({
                emailMsg: '请输入邮箱'
            })
        }
    },
    // 密码输入框的方法
    onChangePass(e) {
        this.setData({
            password: e.detail
        })
    },
    // 跳转到注册页面
    goToRegister() {
        wx.navigateTo({
            url: `../register/register`
        });
    },
    // 当是手机号登录时触发这个方法
    loginByMobile() {
        wx.showLoading({
            title: '登录中...'
        });
        api.loginbyTel(this.data.telNum, this.data.password).then(res => {
            if (res.code === 200) {
                wx.setStorageSync('uid', res.profile.userId);
                this.store.data.myUid = res.profile.userId
                wx.hideLoading();
                wx.switchTab({
                    url: `../my/my`
                });
            } else {
                wx.hideLoading();
                wx.showToast({
                    title: '登录失败,请检查登录信息',
                    icon: 'none'
                });
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 当是邮箱登录时触发这个方法
    loginByEmail() {
        wx.showLoading({
            title: '登录中...'
        });
        api.loginbyTel(this.data.emails, this.data.password).then(res => {
            if (res.code === 200) {
                wx.hideLoading();
                wx.setStorageSync('uid', res.profile.userId);
                this.store.data.myUid = res.profile.userId
                wx.switchTab({
                    url: `../my/my`
                });
            } else {
                wx.hideLoading();
                wx.showToast({
                    title: '登录失败,请检查登录信息',
                    icon: 'none',
                });
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 登录按钮
    login() {
        if (this.data.active === 0) {
            this.loginByMobile();
        } else if (this.data.active === 1) {
            this.loginByEmail();
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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