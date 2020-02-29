import api from '../../http/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 手机号
        telNum: null,
        // 手机号表单验证错误文案
        mobileMsg: '',
        // 密码
        password: '',
        // 验证码
        captchas: null,
        // 发送验证码button里面的文字
        sendMsg: '发送验证码',
        // 点击了发送验证码后将button变为不可用
        nosend: false,
        // 昵称
        nickname: ''
    },
    // 跳转到登录页的方法
    goToLogin() {
        wx.navigateTo({
            url: `../login/login`
        });
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
    // 手机号输入框点击清除控件时触发的方法
    clearTel() {
        this.setData({
            telNum: null
        })
    },
    // 密码输入框点击清除控件时触发的方法
    clearPass() {
        this.setData({
            password: ''
        })
    },
    // 验证码输入框点击清除控件时触发的方法
    clearCode() {
        this.setData({
            captchas: null
        })
    },
    // 昵称输入框点击清除控件时触发的方法
    clearNick() {
        this.setData({
            nickname: ''
        })
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
    // 密码输入框的方法
    onChangePass(e) {
        this.setData({
            password: e.detail
        })
    },
    // 验证码输入框的方法
    onChangeCode(e) {
        this.setData({
            captchas: e.detail
        })
    },
    // 发送验证码的定时器方法
    sendInterval() {
        let timeOut = 60
        let sends = setInterval(() => {
            if (timeOut > 0) {
                this.setData({
                    sendMsg: `${timeOut}秒后重新发送`,
                    nosend: true
                })
                timeOut--
            } else {
                clearInterval(sends)
                this.setData({
                    sendMsg: '重新发送',
                    nosend: false
                })
            }
        }, 1000)
    },
    // 手机号验证通过后调用发送验证码的方法
    startSend() {
        api.sendCaptcha(this.data.telNum).then(res => {
            console.log(res);
            if (res.code === 200) {}
        }).catch(err => {
            console.log(err);
        });
    },
    // 发送验证码的方法
    sendCode() {
        if (this.data.telNum !== null) {
            if ((/^1[3456789]\d{9}$/.test(this.data.telNum))) {
                api.checkTel(this.data.telNum).then(res => {
                    if (res.exist === 1) {
                        wx.showToast({
                            title: '该手机号已被注册',
                            icon: 'none'
                        });
                        // else执行的则是手机号未被注册后的发送验证码操作
                    } else {
                        this.sendInterval()
                        this.startSend()
                    }
                }).catch(err => {
                    console.log(err);
                });
            } else {
                wx.showToast({
                    title: '请输入正确的手机号',
                    icon: 'none',
                });
            }
        } else {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none'
            });
        }

    },
    // 昵称输入框的方法
    onChangeNick(e) {
        this.setData({
            nickname: e.detail
        })
    },
    // 注册按钮
    registers() {
        let that = this.data
        if (that.telNum !== null && that.password.trim() !== '' && that.captchas !== null && that.nickname.trim() !== '') {
            api.register(that.telNum, that.password, that.captchas, that.nickname).then(res => {
                if (res.code === 200) {
                    wx.showToast({
                        title: '注册成功',
                        icon: 'none'
                    });
                    this.setData({
                        telNum: null,
                        password: '',
                        captchas: null,
                        nickname: ''
                    })
                    wx.navigateTo({
                        url: '../login/login'
                    });
                }
            }).catch(err => {
                if (err.response.data.code === 505) {
                    wx.showToast({
                        title: err.response.data.message,
                        icon: 'none'
                    });
                    this.setData({
                        nickname: ''
                    })
                } else if (err.response.data.code === 503) {
                    wx.showToast({
                        title: err.response.data.message,
                        icon: 'none'
                    });
                    this.setData({
                        captchas: null
                    })
                }
            });
        } else {
            wx.showToast({
                title: '请输入完整信息',
                icon: 'none'
            });
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