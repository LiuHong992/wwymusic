import api from '../../http/api'
var time = require('../../utils/util');
import store from '../../store/index'
import create from '../../utils/store/create'
create.Page(store, {
    use: ['searchLimit', 'afterSearch'],
    /**
     * 页面的初始数据
     */
    data: {
        // 控制首页显示的参数
        flag: true,
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
        // 接收搜索页tabs数据的数组
        typeArr: [],
        // 当前标签栏选中的项
        active: 1018,
        // 接收搜索出来的数据的对象(综合栏)
        sResult: {},
        // 接收搜索出来的数据的数组(除综合外)
        // sResultArr: [],
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
        this.store.data.searchLimit = 30
        this.setData({
            flag: !this.data.flag,
            searchNum: 0,
            connectNum: 0,
            active: 1018,
            sValue: '',
            connectArr: [],
            sResult: {}
        })
    },
    // 搜索后返回按钮方法
    afterChange() {
        this.store.data.searchLimit = 30
        this.setData({
            searchNum: 0,
            connectNum: 0,
            active: 1018,
            sValue: '',
            connectArr: [],
            sResult: {}
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
    // 点击联想词的方法
    changesValue(e) {
        let { item } = e.currentTarget.dataset
        this.setData({
            searchNum: 1,
            sValue: item.keyword
        })
        this.searchResult(this.data.sValue)
    },
    // 热搜子组件分发回父组件的方法
    changeValues(e) {
        this.setData({
            searchNum: 1,
            sValue: e.detail
        })
        this.searchResult(this.data.sValue)
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
            this.searchResult(this.data.sValue.trim())
        } else {
            this.searchResult(this.data.sValue.trim())
        }
    },
    // 搜索事件(综合栏)
    searchResult(keywords) {
        wx.showLoading({
            title: '搜索中...'
        });
        api.keywordSearches(keywords, this.data.active, this.store.data.searchLimit).then(res => {
            if (res.code === 200) {
                wx.hideLoading();
                this.data.sResult = res.result
                    // 处理专辑发布时间
                if (res.result.album.albums.length > 0) {
                    res.result.album.albums.map(item => {
                        item.publishTime = time.formatTimeTwo((item.publishTime), 'Y-M-D')
                    })
                }
                // 处理歌单播放次数
                if (res.result.playList.playLists.length > 0) {
                    res.result.playList.playLists.map(item => {
                        item.playCount = api.playCounts(item.playCount)
                    })
                }
                // 处理视频播放时间以及播放次数
                if (res.result.video.videos.length > 0) {
                    res.result.video.videos.map(item => {
                        item.durationms = time.formatTimeTwo(item.durationms, 'm:s')
                        item.playTime = api.playCounts(item.playTime)
                    })
                }
                this.setData({
                    sResult: this.data.sResult
                })
            } else {
                wx.hideLoading();
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 搜索事件(除综合栏其他的标签栏)
    searchOthers(keywords) {
        let sR = this.store.data
        wx.showLoading({
            title: '加载中...'
        });
        api.keywordSearches(keywords, this.data.active, this.store.data.searchLimit).then(res => {
            if (res.code === 200) {
                wx.hideLoading();
                // 处理专辑发布时间
                if (this.data.active === 10 && res.result.albums.length > 0) {
                    res.result.albums.map(item => {
                        item.publishTime = time.formatTimeTwo((item.publishTime), 'Y-M-D')
                    })
                }
                // 处理歌单播放次数
                if (this.data.active === 1000 && res.result.playlists.length > 0) {
                    res.result.playlists.map(item => {
                        item.playCount = api.playCounts(item.playCount)
                    })
                }
                // 处理视频播放时间以及播放次数
                if (this.data.active === 1014 && res.result.videos.length > 0) {
                    res.result.videos.map(item => {
                        item.durationms = time.formatTimeTwo(item.durationms, 'm:s')
                        item.playTime = api.playCounts(item.playTime)
                    })
                } else if (this.data.active === 1004 && res.result.mvs.length > 0) {
                    res.result.mvs.map(item => {
                        item.duration = time.formatTimeTwo(item.duration, 'm:s')
                        item.playCount = api.playCounts(item.playCount)
                    })
                }
                this.data.active === 1 ? sR.afterSearch = res.result.songs : ''
                this.data.active === 1014 ? sR.afterSearch = res.result.videos : ''
                this.data.active === 100 ? sR.afterSearch = res.result.artists : ''
                this.data.active === 10 ? sR.afterSearch = res.result.albums : ''
                this.data.active === 1000 ? sR.afterSearch = res.result.playlists : ''
                this.data.active === 1009 ? sR.afterSearch = res.result.djRadios : ''
                this.data.active === 1002 ? sR.afterSearch = res.result.userprofiles : ''
                this.data.active === 1004 ? sR.afterSearch = res.result.mvs : ''
            } else {
                wx.hideLoading();
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 搜索框内有值后点击联想词盒子第一项触发的方法
    valueSearch() {
        this.setData({
            searchNum: 1,
            connectNum: 1
        })
        this.searchResult(this.data.sValue)
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
    // 更改标签栏active
    changeActive(e) {
        this.store.data.afterSearch = []
        this.store.data.searchLimit = 30
        this.setData({
            active: e.detail.name,
        })
        if (this.data.active === 1018) {
            this.searchResult(this.data.sValue)
        } else {
            this.searchOthers(this.data.sValue)
        }
    },
    // 请求轮播图数据
    getBanners() {
        wx.showLoading({
            title: '加载中...'
        });
        api.getIndexBanner().then(res => {
            if (res.code === 200) {
                this.setData({
                    banners: res.banners,
                    typeArr: api.searchType
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
                if (this.data.recArr.length > 0) {
                    this.data.recArr.map(item => {
                        item.playCount = api.playCounts(item.playCount)
                    })
                }
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
                reciveArr.push(dataArr[num])
            } else {
                i--
            }
        }
    },
    // 子组件分发回父组件的事件(上拉加载数据)
    toBottom(e) {
        if (e.detail) {
            this.store.data.searchLimit += 10
            if (this.store.data.searchLimit > 100) {
                wx.showToast({
                    title: '没有更多数据了~',
                    icon: 'none',
                });
            } else {
                this.searchOthers(this.data.sValue)
            }
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