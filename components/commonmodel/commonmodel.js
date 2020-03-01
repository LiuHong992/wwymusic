import create from '../../utils/store/create'
import store from '../../store/index'
import api from '../../http/api'
create.Component(store, {
    use: ['songsources'],
    /**
     * 组件的属性列表
     */
    properties: {
        modelArr: {
            type: Array,
            value: () => []
        },
        detailname: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    // 定义的全局样式在子组件里面生效
    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        // 跳转到相关详情页
        goToDetail(e) {
            let { item } = e.currentTarget.dataset
            if (this.properties.detailname === '歌单' || this.properties.detailname === '专辑') {
                wx.navigateTo({
                    url: `../../pages/songdetail/songdetail?id=${item.id}&detailname=${this.properties.detailname}`
                });
            } else if (this.properties.detailname === '电台' || this.properties.detailname === '节目') {
                wx.navigateTo({
                    url: `../../pages/djprodetail/djprodetail?id=${item.id}&detailname=${this.properties.detailname}`
                });
            } else {
                let that = this.store.data
                let hadFlag = true
                that.songsources.map(itemOne => {
                    if (itemOne.id === item.id) {
                        hadFlag = false
                    }
                })
                if (hadFlag) {
                    api.getSrces(item)
                    setTimeout(() => {
                        if (item.copyright) {
                            // 点击的是音源时将歌曲信息存入vuex中(音源src请求好了放进去)
                            that.songsources.push(item)
                                // api.filterSongs(item, that.songsources)
                            wx.navigateTo({
                                url: `../../pages/playdetail/playdetail?sid=1`
                            });
                        } else {
                            wx.showToast({
                                title: '该歌曲暂无版权哦~',
                                icon: 'none'
                            });
                        }
                    }, 400)
                } else {
                    wx.navigateTo({
                        url: `../../pages/playdetail/playdetail?sid=${item.id}`
                    });
                }
            }
        }
    },
    lifetimes: {
        attached: function() {
            // 在组件实例进入页面节点树时执行
        },
    }
})