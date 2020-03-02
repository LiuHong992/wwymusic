import api from '../../http/api'
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['songsources', 'bgMusic', 'playTypes'],
    /**
     * 页面的初始数据
     */
    data: {
        // 播放的第几首歌
        pIndex: 0,
        // 播放列表
        playlist: [],
        // 接收vuex中音源src
        playSrc: '',
        // 接收vuex中音源信息
        songRes: {},
        // 控制动画的参数
        animations: true,
        // 动画暂停与启动
        animationstate: 'running',
        // 播放开关
        isOpen: true,
        // 歌曲时长
        duration: '05:20',
        starttime: '00:00', //当前位置
        // 导航栏图片地址
        navImages: ['../../assets/images/play-l.png', '../../assets/images/play-d.png', '../../assets/images/play-c.png', '../../assets/images/play-m.png'],
        // 播放模式
        playmode: 0
    },
    // 获取音乐播放实例
    getPlayer() {
        const bgMusic = wx.getBackgroundAudioManager()
            // 歌曲名
        bgMusic.title = this.data.songRes.name
            // 专辑名
        bgMusic.epname = this.data.songRes.album.name
            // 歌手名
        bgMusic.singer = this.data.songRes.artists[0].name
            // 封面图
        bgMusic.coverImgUrl = this.data.songRes.album.blurPicUrl
            // 设置了 src 之后会自动播放
            // 音源
        bgMusic.src = this.data.playSrc
        this.store.data.bgMusic = bgMusic
            // 开始监听播放实例
        this.onTimeUpdate(bgMusic)
    },
    // 获取单曲播放的列表
    getSongs() {
        let that = this.store.data
        this.setData({
            pIndex: that.songsources.length - 1
        })
        api.getSrces(that.songsources[this.data.pIndex])
            // console.log(that.songsources[playIndex]);
            // console.log(that.songsources[playIndex].srcs);
        setTimeout(() => {
            this.setData({
                playSrc: that.songsources[this.data.pIndex].srcs,
                songRes: that.songsources[this.data.pIndex].song
            })
            this.getPlayer()
        }, 1600)
    },
    // 播放状态的监听
    onTimeUpdate(bgMusic) {
        bgMusic.onEnded(() => {
            this.setData({
                animations: false
            })
            this.playNext()
        })
        bgMusic.onPlay(() => {
            this.setData({
                isOpen: true
            })
        })
        bgMusic.onNext(() => {
            this.playNext()
        })
        bgMusic.onPrev(() => {
            this.playPrev()
        })
        bgMusic.onPause(() => {
            this.setData({
                isOpen: false,
                animationstate: 'paused'
            })
        })
        bgMusic.onPlay(() => {
                this.setData({
                    isOpen: true,
                    animationstate: 'running'
                })
            })
            // 回调函数
        bgMusic.onTimeUpdate(() => {
            var max = parseInt(bgMusic.duration);
            var points = parseInt(max / 60)
            var seconds = max % 60
            if (seconds < 10) {
                seconds = "0" + seconds;
            };
            if (points < 10) {
                points = "0" + points;
            }
            var currentTime = parseInt(bgMusic.currentTime);
            var min = parseInt(currentTime / 60);
            var sec = currentTime % 60;
            if (sec < 10) {
                sec = "0" + sec;
            };
            if (min < 10) {
                min = "0" + min;
            }
            var startTime = min + ':' + sec; /*  00:00  */
            var endTime = points + ':' + seconds;
            this.setData({
                offset: currentTime,
                starttime: startTime,
                duration: endTime,
                max: max,
                // songDetail: this.store.data.playlist[this.store.data.playIndex],
            })
        })
    },
    // 改变播放模式
    changeType() {
        let n = this.data.playmode
        n === 2 ? n = 0 : n++
            this.store.data.playTypes = n
        this.setData({
            playmode: n
        })
        wx.showToast({
            title: `${n===1?'单曲循环':n===2?'随机循环':'列表循环'}`,
            icon: 'none'
        });
        console.log(this.data.playmode);
    },
    // 播放按钮和暂停按钮
    changePlay() {
        this.setData({
            isOpen: !this.data.isOpen
        })
        if (!this.data.isOpen) {
            this.store.data.bgMusic.pause()
        } else {
            this.store.data.bgMusic.play()
        }
    },
    // 滑动进度条
    sliderChange(e) {
        var offset = parseInt(e.detail.value);
        if (this.data.isOpen) {
            this.store.data.bgMusic.play();
        }
        this.store.data.bgMusic.seek(offset);
    },
    // 上一曲
    playPrev() {
        let t = this.data
        let ts = this.store.data
        if (ts.songsources.length === 1) {
            wx.showToast({
                title: '您播放列表里就一首歌哦~',
                icon: 'none'
            });
        } else {
            if (t.playmode === 1 || ts.songsources.length === 1) {
                ts.bgMusic.seek(0)
            } else if (t.playmode === 0) {
                if (t.pIndex > 0) {
                    t.pIndex--
                        ts.playIndex = t.pIndex
                    this.setData({
                        pIndex: t.pIndex,
                        playSrc: ts.songsources[t.pIndex].srcs,
                        songRes: ts.songsources[t.pIndex].song
                    })
                } else {
                    wx.showToast({
                        title: '您已经到第一首歌了哦~',
                        icon: 'none',
                    });
                }
            } else {
                let rNum = parseInt(Math.random() * (ts.songsources.length))
                    // if (rNum === t.pIndex) {
                    //     return;
                    // }
                t.pIndex = ts.playIndex = rNum
                this.setData({
                    pIndex: t.pIndex,
                    playSrc: ts.songsources[t.pIndex].srcs,
                    songRes: ts.songsources[t.pIndex].song
                })
            }
            this.setData({
                animations: true,
                animationstate: 'running'
            })
            this.getPlayer();
        }
    },
    // 下一曲
    playNext() {
        let t = this.data
        let ts = this.store.data
        if (ts.songsources.length === 1) {
            wx.showToast({
                title: '您播放列表里就一首歌哦~',
                icon: 'none'
            });
        } else {
            if (t.playmode === 1 || ts.songsources.length === 1) {
                ts.bgMusic.seek(0)
            } else if (t.playmode === 0) {
                t.pIndex >= ts.songsources.length - 1 ? t.pIndex = 0 : t.pIndex++
                    ts.playIndex = t.pIndex
                this.setData({
                    pIndex: t.pIndex,
                    playSrc: ts.songsources[t.pIndex].srcs,
                    songRes: ts.songsources[t.pIndex].song
                })
            } else {
                let rNum = parseInt(Math.random() * (ts.songsources.length))
                t.pIndex = ts.playIndex = rNum
                this.setData({
                    pIndex: t.pIndex,
                    playSrc: ts.songsources[t.pIndex].srcs,
                    songRes: ts.songsources[t.pIndex].song
                })
            }
            this.setData({
                animations: true,
                animationstate: 'running'
            })
            this.getPlayer();
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this.store.data
        if (options.sid === '1') {
            this.getSongs()
        } else {
            that.songsources.map(item => {
                if (item.id == options.sid) {
                    this.setData({
                        playSrc: item.srcs,
                        songRes: item.song
                    })
                }
            })
            setTimeout(() => {
                this.getPlayer()
            }, 100)
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
        this.setData({
            playlist: this.store.data.songsources
        })
        this.store.data.bgMusic ? this.onTimeUpdate(this.store.data.bgMusic) : ''
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