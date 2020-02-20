import api from '../../http/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 接收轮播图数据数组
        banners: [],
        // 导航栏数据
        navBar: [{
                paths: '../../assets/images/recommend.png',
                title: '每日推荐'
            },
            {
                paths: '../../assets/images/songlist.png',
                title: '歌单'
            },
            {
                paths: '../../assets/images/rank.png',
                title: '排行榜'
            },
            {
                paths: '../../assets/images/radio.png',
                title: '电台'
            },
            {
                paths: '../../assets/images/live.png',
                title: '直播'
            },
        ],
        // 接收推荐歌单数据
        recArr: [],
        // 控制新碟新歌样式的参数
        newNum: 0,
        // 接收新碟数据的数组
        newdishArr: [],
        // 接收新歌数据的数组
        newsongArr: [],
        // 接收音乐新势力数据的数组
        newpowerArr: [],
        // 接收推荐电台的数组
        radioArr: [],
        // 接收推荐节目的数组
        programArr: []
            // phones: 13981419660,
            // password: 'huanghe719'
    },
    // 请求轮播图数据
    getBanners() {
        wx.showLoading({
            title: '加载中...'
        });
        api.getIndexBanner().then(res => {
            if (res.code === 200) {
                this.setData({
                    banners: res.banners
                })
                wx.hideLoading();
            } else {
                wx.hideLoading();
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 请求推荐音乐的方法
    getRecommend() {
        api.getIndexRec().then(res => {
            if (res.code === 200) {
                this.grounps(res.result, this.data.recArr)
                this.setData({
                    recArr: this.data.recArr
                })
            }
        }).catch(err => {
            console.log(err);
        });
    },
    // 新歌新碟切换
    changeNum() {
        this.setData({
            newNum: 0
        })
    },
    // 新歌新碟切换
    changeNums() {
        this.setData({
            newNum: 1
        })
    },
    // 请求新碟音乐的方法
    getNewdish() {
        api.getNewest().then(res => {
            if (res.code === 200) {
                this.grounps(res.albums, this.data.newdishArr)
                this.setData({
                    newdishArr: this.data.newdishArr
                })
            }
        }).catch(err => {
            console.log(err);
        });
    },
    // 请求新歌音乐和音乐新势力的方法
    getNewsongs() {
        api.getNewSong().then(res => {
            if (res.code === 200) {
                this.grounps(res.result, this.data.newsongArr)
                this.setData({
                    newsongArr: this.data.newsongArr,
                    newpowerArr: this.data.newpowerArr
                })
            }
        }).catch(err => {
            console.log(err);
        });
    },
    // 请求推荐电台的方法
    getRadio() {
        api.getRecRadio().then(res => {
            if (res.code === 200) {
                this.setData({
                    radioArr: res.result,
                })
            }
        }).catch(err => {
            console.log(err);
        });
    },
    // 请求推荐节目的方法
    getProgram() {
        api.getRecProgram().then(res => {
            if (res.code === 200) {
                this.grounps(res.programs, this.data.programArr)
                this.setData({
                    programArr: this.data.programArr,
                })
            }
        }).catch(err => {
            console.log(err);
        });
    },
    // 数据分组的方法
    grounps(dataArr, reciveArr) {
        for (let i = 0; i < 6; i++) {
            let num = parseInt(Math.random() * (dataArr.length - 1))
            let flag = true
            reciveArr.map(item => {
                if (item === dataArr[num]) {
                    flag = false
                }
            })
            if (flag) {
                if (!dataArr[num].playCount) {
                    reciveArr.push(dataArr[num])
                } else {
                    this.playCounts(dataArr[num])
                    reciveArr.push(dataArr[num])
                }
            } else {
                i--
            }
        }
    },
    // 播放次数的计算方法
    playCounts(items) {
        if (items.playCount >= 100000000) {
            let one = (items.playCount / 100000000).toFixed(2)
            return items.playCount = `${one}亿次`
        } else if (items.playCount < 100000000 && items.playCount >= 10000) {
            let one = parseInt(items.playCount / 10000)
            return items.playCount = `${one}万次`
        } else {
            return items.playCount = `${items.playCount}次`
        }
    },
    // login() {
    //     api.loginbyTel(this.data.phones, this.data.password).then(res => {
    //         if (res.code === 200) {
    //             console.log(res);
    //         } else {
    //             console.log(res);
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getBanners();
        this.getRecommend();
        this.getNewdish();
        this.getNewsongs();
        this.getRadio();
        this.getProgram();
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