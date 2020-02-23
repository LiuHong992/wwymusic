import api from '../../http/api'
import store from '../../store/index'
import create from '../../utils/store/create'
create.Page(store, {
    use: ['typeNum'],
    /**
     * 页面的初始数据
     */
    data: {
        // 控制首页显示的参数
        flag: false,
        // 接收默认搜索关键词对象
        defalutObj: {},
        // 搜索框的值
        sValue: '',
        // 接收热搜榜的数组
        hotArr: [],
        // 控制搜索与否的参数
        searchNum: 0,
        // 控制搜索联想框的显示与否
        connectNum: 0,
        // 接收联想词的数组
        connectArr: [],
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
    },
    // 搜索框聚焦时改变indexNum
    changeFlag() {
        this.setData({
            flag: !this.data.flag,
            searchNum: 0,
            connectNum: 0,
            sValue: '',
            connectArr: []
        })
    },
    // 默认搜索关键词
    defaultKeyword() {
        api.defaultKeyword().then(res => {
            if (res.code === 200) {
                this.data.defalutObj = res.data
                this.setData({
                    defalutObj: this.data.defalutObj
                })
            }
        }).catch(err => {

        });
    },
    // 获取热搜榜数据
    getHot() {
        api.hotSearchList().then((res) => {
            if (res.code === 200) {
                this.data.hotArr = res.data
                this.setData({
                    hotArr: this.data.hotArr
                })
                console.log(this.data.hotArr);
            }
        }).catch((err) => {
            console.log(err);
        });
    },
    // 获取联想词的方法
    connectWord(keys) {
        api.searchSuggest(keys).then(res => {
            if (res.code === 200) {
                this.data.connectArr = res.result.allMatch
                this.setData({
                    connectArr: this.data.connectArr
                })
            }
        }).catch((err) => {

        });
    },
    // 输入框值发生变化时触发
    changeValue(e) {
        this.setData({
            sValue: e.detail
        })
        if (this.data.sValue.trim() !== '') {
            this.connectWord(this.data.sValue.trim())
        } else {
            this.setData({
                connectArr: []
            })
        }
    },
    // 输入关键词按下确定键时的方法
    goToSearch() {
        this.setData({
            searchNum: 1,
            connectNum: 1
        })
        if (this.data.sValue.trim() === '') {
            this.setData({
                sValue: this.data.defalutObj.realkeyword
            })
            this.connectWord(this.data.sValue.trim())
        }
    },
    // 搜索事件
    searchResult() {

    },
    // 搜索之后获取输入框焦点显示搜索联想框
    showConnect() {
        this.setData({
            connectNum: 0
        })
    },
    // 失去焦点则隐藏
    hideConnect() {
        setTimeout(() => {
            this.setData({
                connectNum: 1
            })
        }, 50)
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.defaultKeyword();
        this.getHot();
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