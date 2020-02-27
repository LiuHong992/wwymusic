// components/singerDetailTwo/singerDetailTwo.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        hSongArr: {
            type: Array,
            value: () => []
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
        chooseAll() {
            wx.showToast({
                title: '该模块暂未开发，敬请期待~',
                icon: 'none',
            });
        }
    }
})