import api from '../../http/api'
import area from '../../global/area'
var time = require('../../utils/util');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 接收传过来的uid
        infoUid: '',
        // 昵称参数
        infoNick: '',
        // 性别参数
        infoGender: 0,
        // 生日参数
        infoBirth: '',
        // 生日时间戳
        birthdayNum: '',
        currentDate: '',
        // 城市参数(文本类型)
        province: '',
        city: '',
        // 城市参数(数字类型)
        provinceNum: '',
        cityNum: '',
        // 城市列表数据
        areaList: area,
        actions: [{
                name: '保密'
            },
            {
                name: '男'
            },
            {
                name: '女'
            }
        ],
        // 时间选择器参数
        maxDate: new Date().getTime(),
        minDate: new Date(1960, 0, 1).getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            } else if (type === 'day') {
                return `${value}日`;
            }
            return value;
        },
        // 签名参数
        shortDesc: '',
        // 性别选择器的显示与隐藏
        sexShow: false,
        // 时间选择器的显示与隐藏
        showDate: false,
        // 城市的显示与隐藏
        showCitys: false,
    },
    // 根据获取到的uid对用户信息进行请求
    getUserInfo() {
        let that = this.data
        api.getUserInfo(this.data.infoUid).then(res => {
            if (res.code === 200) {
                console.log(res.profile);
                this.setData({
                        infoNick: res.profile.nickname,
                        infoGender: res.profile.gender,
                        provinceNum: res.profile.province,
                        cityNum: res.profile.city,
                        shortDesc: res.profile.signature
                    })
                    // 给生日参数赋值
                if (res.profile.birthday > 0) {
                    this.setData({
                        infoBirth: time.formatTimeTwo(res.profile.birthday, 'Y/M/D'),
                        currentDate: res.profile.birthday,
                        birthdayNum: res.profile.birthday,
                    })
                } else if (res.profile.birthday < 0) {
                    this.setData({
                        currentDate: that.minDate,
                        infoBirth: time.formatTimeTwo(that.minDate, 'Y/M/D'),
                        birthdayNum: that.minDate,
                    })
                }
                // 给省份文字赋值
                if (res.profile.province > 0) {
                    for (let i in that.areaList.province_list) {
                        if (i == that.provinceNum) {
                            this.setData({
                                province: that.areaList.province_list[i]
                            })
                        }
                    }
                }
                // 给城市文字赋值
                if (res.profile.city > 0) {
                    for (let j in that.areaList.city_list) {
                        if (j == that.cityNum) {
                            this.setData({
                                city: that.areaList.city_list[j]
                            })
                        }
                    }
                }
            }
        }).catch(err => {
            console.log(err);
        });
    },
    // 输入框失去焦点进行赋值
    changeNick(e) {
        this.setData({
            infoNick: e.detail.value
        })
    },
    // 打开性别选择器
    showSheet() {
        this.setData({
            sexShow: true
        })
    },
    // 关闭性别选择器
    onClose() {
        this.setData({ sexShow: false });
    },
    // 点击性别选择器后的事件
    onSelect(e) {
        if (e.detail.name === '保密') {
            this.setData({
                infoGender: 0
            })
        } else if (e.detail.name === '男') {
            this.setData({
                infoGender: 1
            })
        } else {
            this.setData({
                infoGender: 2
            })
        }
        this.setData({
            sexShow: false
        })
    },
    // 打开日期选择器的事件
    showDatas() {
        this.setData({
            showDate: true
        })
    },
    //确认生日
    dateConfirm(e) {
        this.setData({
            infoBirth: time.formatTimeTwo(e.detail, 'Y/M/D'),
            birthdayNum: e.detail,
            showDate: false
        })
    },
    // 时间选择器点击取消时触发的方法
    dateCancel() {
        this.setData({
            showDate: false
        })
    },
    // 城市选择器显示
    showCity() {
        this.setData({
            showCitys: true
        })
    },
    // 地区选择器点击取消时
    areaCancel() {
        this.setData({
            showCitys: false
        })
    },
    // 地区选择器点击确定时
    areaConfirm(e) {
        this.setData({
            province: e.detail.values[0].name,
            city: e.detail.values[1].name,
            provinceNum: e.detail.values[0].code,
            cityNum: e.detail.values[1].code,
            showCitys: false
        })
    },
    // 签名的修改方法
    changeSignature(e) {
        this.setData({
            shortDesc: e.detail
        })
    },
    // 修改操作(接口有问题，不能做到修改)
    saveAll() {
        let t = this.data
        api.updateUserInfo(t.infoGender, t.birthdayNum, t.infoNick, t.provinceNum, t.cityNum, t.shortDesc).then(res => {
            if (res.code === 200) {
                console.log(res);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            infoUid: options.uid
        })
        if (this.data.infoUid !== '') {
            this.getUserInfo()
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