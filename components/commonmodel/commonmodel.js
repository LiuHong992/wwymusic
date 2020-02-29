// components/Index/commonmodel/commonmodel.js
Component({
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
                console.log(item);
                wx.navigateTo({
                    url: `../../pages/playdetail/playdetail?sid=${item.id}`
                });
            }
        }
    }
})