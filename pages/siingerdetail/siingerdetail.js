import api from '../../http/api'
import create from '../../utils/store/create'
import store from '../../store/index'
var time = require('../../utils/util');
create.Page(store, {
    use: ['singerOffset'],
    /**
     * 页面的初始数据
     */
    data: {
        // 接收歌手页传过来的id
        singerid: '',
        // 接收歌手信息的对象
        singerinfo: {},
        // 接收热歌前五首数组
        fiveSongs: [],
        // 接收歌手热门的50首歌曲的数组
        hSongArr: [],
        // 接收专辑的数组
        albumsArr: [],
        // 接收视频的数组
        videoMvs: [],
        // 标签栏数组
        tabsArr: [{
                titles: '主页',
                ide: '1'
            },
            {
                titles: '歌曲',
                ide: '1'
            },
            {
                titles: '专辑',
                ide: '2'
            },
            {
                titles: '视频',
                ide: '2'
            },
        ],
        // 控制下划线和字体变红的参数
        singertabNum: 3
    },
    // 请求歌手的热门歌曲和相关信息
    getSongArtist() {
        wx.showLoading({
            title: '加载中...'
        });
        api.getSong(this.data.singerid).then(res => {
            if (res.code === 200) {
                wx.hideLoading();
                this.data.singerinfo = res.artist
                this.data.hSongArr = res.hotSongs
                this.data.fiveSongs = res.hotSongs.slice(0, 5)
                this.setData({
                    singerinfo: this.data.singerinfo,
                    hSongArr: this.data.hSongArr,
                    fiveSongs: this.data.fiveSongs
                })
                console.log(this.data.singerinfo);
                // console.log(this.data.hSongArr);
                // console.log(this.data.fiveSongs);
            } else {
                wx.hideLoading();
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    // 请求歌手的相关专辑
    getAlbumsinfo() {
        api.getAlbum(this.data.singerid, this.store.data.singerOffset).then(res => {
            if (res.code === 200) {
                this.data.albumsArr.push(...res.hotAlbums)
                this.data.albumsArr.map(item => {
                    item.publishTime = time.formatTimeTwo(item.publishTime, 'Y.M.D')
                })
                this.setData({
                    albumsArr: this.data.albumsArr
                })
            }
        }).catch(err => {
            console.log(err);
        });
    },
    // 请求歌手的视频(mv)
    getMvs() {
        api.getMv(this.data.singerid).then(res => {
            if (res.code === 200) {
                this.data.videoMvs = res.mvs
                this.data.videoMvs.map(item => {
                    item.playCount = api.playCounts(item.playCount)
                })
                this.setData({
                    videoMvs: this.data.videoMvs
                })
                console.log(this.data.videoMvs);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    // 点击标签栏时触发的方法
    changeOne(e) {
        let { index } = e.currentTarget.dataset
        this.setData({
            singertabNum: index
        })
    },
    // 主页组件分发回父组件的事件
    changeNumOne(e) {
        this.setData({
            singertabNum: e.detail
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.name
        });
        this.setData({
            singerid: options.id
        })
        if (this.data.singerid !== '') {
            this.getSongArtist();
            this.getAlbumsinfo();
            this.getMvs();
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
        if (this.data.singertabNum === 2) {
            if (this.data.albumsArr.length < this.data.singerinfo.albumSize) {
                this.store.data.singerOffset += 30
                this.getAlbumsinfo();
            } else {
                wx.showToast({
                    title: '暂无更多数据了哦~',
                    icon: 'none',
                });
            }
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})