export default {
    // data等同于state
    // 要共享的数据都放在data里面
    // data等同于state
    data: {
        // 需要拼接到图片地址前面的静态资源地址
        webs: 'https://statics.zhuishushenqi.com',
        // 大分类
        type: 'hot',
        // 小分类
        minor: '',
        // 分类页上拉加载更多参数
        pages: 1,
        // 跳转详情页时存储书籍信息的对象
        bookObj: {},
        // 搜索历史数组
        searchH: [],
        // 章节数组
        chapterArr: [],
        // 章节数
        chapterNum: 0,
        // 收藏数组
        collectArr: []
    }
}