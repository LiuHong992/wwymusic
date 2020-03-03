import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    use: ['songsources', 'bgMusic', 'playTypes', 'playIndex', 'isPlay'],
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        isPlay: true,
        // 接收信息
        showData: {},
        show: false,
    },
    // 定义的全局样式在子组件里面生效
    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        goToMusic() {
            wx.navigateTo({
                url: `/pages/playdetail/playdetail`,
            });
        },
        isPlay() {
            this.data.isPlay = !this.data.isPlay
            this.setData({
                isPlay: this.data.isPlay
            })
            this.store.data.isPlay = this.data.isPlay
            if (!this.data.isPlay) {
                this.store.data.bgMusic.pause()
            } else {
                this.store.data.bgMusic.play()
            }
        },
        onClose() {
            this.setData({
                show: !this.data.show
            })
        },
        // 获取音乐播放实例
        getPlayer() {
            let th = this.store.data
                // 歌曲名
            th.bgMusic.title = this.data.showData.song.name
                // 专辑名
            th.bgMusic.epname = this.data.showData.song.album.name
                // 歌手名
            th.bgMusic.singer = this.data.showData.song.artists[0].name
                // 封面图
            th.bgMusic.coverImgUrl = this.data.showData.song.album.blurPicUrl
                // 设置了 src 之后会自动播放
                // 音源
            th.bgMusic.src = this.data.showData.srcs
                // th.bgMusic = bgMusic
                // 开始监听播放实例
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
                if (ts.playTypes === 1 || ts.songsources.length === 1) {
                    ts.bgMusic.seek(0)
                } else if (ts.playTypes === 0) {
                    ts.playIndex >= ts.songsources.length - 1 ? ts.playIndex = 0 : ts.playIndex++
                        this.setData({
                            showData: ts.songsources[ts.playIndex]
                        })
                } else {
                    let rNum = parseInt(Math.random() * (ts.songsources.length))
                    ts.playIndex = rNum
                    this.setData({
                        showData: ts.songsources[ts.playIndex]
                    })
                }
                this.getPlayer();
            }
        },
    },
    pageLifetimes: {
        show() {
            if (this.store.data.isPlay) {
                this.setData({
                    isPlay: true
                })
            } else {
                this.setData({
                    isPlay: false
                })
            }
            setTimeout(() => {
                this.setData({
                    showData: this.store.data.songsources[this.store.data.playIndex],
                })
            }, 200)
            let bgm = this.store.data.bgMusic
            bgm.onNext(() => {
                this.playNext()
            })
            bgm.onPrev(() => {
                this.playPrev()
            })
            bgm.onEnded(() => {
                this.playNext()
            })
            bgm.onPlay(() => {
                this.store.data.isPlay = true
                this.setData({
                    isPlay: true
                })
            })
            bgm.onPause(() => {
                this.store.data.isPlay = false
                this.setData({
                    isPlay: false
                })
            })
            bgm.onTimeUpdate(() => {
                this.setData({
                    showData: this.store.data.songsources[this.store.data.playIndex],
                    isPlay: !bgm.paused
                })
            })
        }
    }
})