export default {
    // data等同于state
    // 要共享的数据都放在data里面
    // data等同于state
    data: {
        // 评论上拉加载参数
        commentLimit: 20,
        // 搜索上拉加载参数
        searchLimit: 30,
        // 歌手详情页专辑的上拉加载参数
        singerOffset: 0,
        // 接收搜索出来的结果的数组(除综合栏)
        afterSearch: [],
        // 搜索历史数组
        searchH: [],
        // 接收大分类数组
        bigArr: [],
        // 索引栏
        initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        // 我的页面接收到的uid
        myUid: '',
        // 音乐(音源数组)
        songsources: [],
        // 背景播放实例
        bgMusic: null,
        // 播放状态
        isPlay: false,
        // 播放类型
        playTypes: 0,
        // 播放到第几首歌
        playIndex: 0,
    }
}