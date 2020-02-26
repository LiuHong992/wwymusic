export default {
    // data等同于state
    // 要共享的数据都放在data里面
    // data等同于state
    data: {
        // 评论上拉加载参数
        commentLimit: 20,
        // 搜索上拉加载参数
        searchLimit: 30,
        // 接收搜索出来的结果的数组(除综合栏)
        afterSearch: [],
        // 接收大分类数组
        bigArr: [],
        // 索引栏
        initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    }
}