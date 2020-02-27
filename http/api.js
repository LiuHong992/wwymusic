import fly from '../http/index'

export default ({
    // 歌手相关数组
    "typeList": [{
            id: '5001',
            name: '入驻歌手',
        },
        {
            id: '1001',
            name: '华语男歌手',
        },
        {
            id: '1002',
            name: '华语女歌手',
        },
        {
            id: '1003',
            name: '华语组合/乐队',
        },
        {
            id: '2001',
            name: '欧美男歌手',
        },
        {
            id: '2002',
            name: '欧美女歌手',
        },
        {
            id: '2003',
            name: '欧美组合/乐队',
        },
        {
            id: '6001',
            name: '日本男歌手',
        },
        {
            id: '6002',
            name: '日本女歌手',
        },
        {
            id: '6003',
            name: '日本组合/乐队',
        },
        {
            id: '7001',
            name: '韩国男歌手',
        },
        {
            id: '7002',
            name: '韩国女歌手',
        },
        {
            id: '7003',
            name: '韩国组合/乐队',
        },
        {
            id: '4001',
            name: '其他男歌手',
        },
        {
            id: '4002',
            name: '其他女歌手',
        },
        {
            id: '4003',
            name: '其他组合/乐队',
        },
    ],
    "searchType": [
        { id: 1018, name: "综合" },
        { id: 1, name: "单曲" },
        { id: 1014, name: "视频" },
        { id: 100, name: "歌手" },
        { id: 10, name: "专辑" },
        { id: 1000, name: "歌单" },
        { id: 1009, name: "电台" },
        { id: 1002, name: "用户" },
        { id: 1004, name: "MV" },
    ],
    // 登录页

    // 登录页有两个接口，一个手机号，一个邮箱登录
    // 手机号登录(需传入两个参数，phone: 手机号码 password: 密码)
    loginbyTel(phone, password) {
        return fly.get(`/login/cellphone?phone=${phone}&password=${password}`)
    },
    // 邮箱登录(email: 163 网易邮箱，password: 密码)
    loginbyEmail(email, password) {
        return fly.get(`/login?email${email}&password=${password}`)
    },

    // 注册页

    // 发送验证码(phone: 手机号码)
    sendCaptcha(phone) {
        return fly.get(`/captcha/sent?phone=${phone}`)
    },
    // 验证验证码(phone: 手机号,captcha: 验证码)
    verifyCaptcha(phone, captcha) {
        return fly.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`)
    },
    // 注册(captcha: 验证码,phone : 手机号码,password: 密码,nickname: 昵称)
    register(captcha, phone, password, nickname) {
        return fly.get(`/register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`)
    },
    // 检测手机是否已被注册(phone: 手机号)
    checkTel(phone) {
        return fly.get(`/cellphone/existence/check?phone=${phone}`)
    },

    // 我的页面相关接口

    // 获取用户信息(uid : userId)
    getUserInfo(uid) {
        return fly.get(`/user/detail?uid=${uid}`)
    },
    // 更新用户信息
    // gender: 性别 0:保密 1:男性 2:女性;birthday: 出生日期,时间戳 unix timestamp
    // nickname: 用户昵称; province: 省份id; city: 城市id; signature：用户签名
    updateUserInfo(gender, birthday, nickname, province, city, signature) {
        return fly.get(`/user/update?gender=${gender}&signature=${signature}&city=${city}&nickname=${nickname}&birthday=${birthday}&province=${province}`)
    },
    // 退出登录
    loginOut() {
        return fly.get('/logout')
    },

    // 首页相关接口

    // 获取首页轮播图
    getIndexBanner() {
        return fly.get('/banner')
    },
    // 获取推荐歌单(limit: 取出数量 , 默认为 30)
    getIndexRec() {
        return fly.get(`/personalized`)
    },
    // 获取新碟数据
    getNewest() {
        return fly.get(`/album/newest`)
    },
    // 获取新歌数据(音乐新势力数据也是这个接口返回的数据)
    getNewSong() {
        return fly.get(`/personalized/newsong`)
    },
    // 获取推荐电台
    getRecRadio() {
        return fly.get(`/personalized/djprogram`)
    },
    // 获取推荐节目
    getRecProgram() {
        return fly.get(`/program/recommend`)
    },

    // 从首页数据点击到相关详情页的相关接口

    // 从推荐歌单点击到详情页的接口
    // 自定义导航栏(歌单)
    // id : 推荐歌单 id
    //获取到数据时 res.playlist.tracks 为歌单里面的歌曲
    //其他可能用到 res.playlist.description（简介描述）  res.playlist.name （大标题）
    // res.playlist.backgroundCoverUrl（背景图） res.playlist.coverImgUrl（封面图）
    //res.playlist.creator.avatarUrl  res.playlist.creator.nickname res.playlist.creator.trackCount(共多少首)
    //res.playlist.subscribedCount(收藏) res.playlist.shareCount(分享)  res.playlist.commentCount(评论)
    detailsByRec(id) {
        return fly.get(`/playlist/detail?id=${id}`)
    },
    // 从新碟点击到详情页的接口
    // 自定义导航栏(专辑)
    // id : 专辑歌单 id
    // res.songs这个数组为下方歌曲列表,数组长度就位总共多少歌曲
    // res.album对象为顶部相关数据的渲染对象
    detailByAlbum(id) {
        return fly.get(`/album?id=${id}`)
    },
    // 从推荐电台和推荐节目点击到详情页的接口
    // 自定义导航栏(电台/节目)
    // PS:推荐节目中的id为对象最外层id，不要用mainSong里面提供的id(404警告)
    detailByDjProgram(id) {
        return fly.get(`/dj/program/detail?id=${id}`)
    },
    // 电台节目详情的精彩评论的接口
    // 返回的hotComments字段为热门评论，如果hotComments数组为空则取comments作为热门评论展示
    // PS:推荐节目中的id为对象最外层id，不要用mainSong里面提供的id(404警告)
    djproComment(id, limit) {
        return fly.get(`/comment/dj?id=${id}&limit=${limit}`)
    },
    // 获取相关音乐的Url(点击相关歌曲时先获取到相关的url再跳转到播放页面,
    // 如果要请求多个id则是播放歌单的功能,多个id则用逗号隔开,例如：id=12345,54321)
    getMusicUrl(id) {
        return fly.get(`/song/url?id=${id}`)
    },
    // 在点击播放音乐的按钮时先判断歌曲是否有播放版权
    // 说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,
    // 返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
    checkMusicPlay(id) {
        return fly.get(`/check/music?id=${id}`)
    },
    //获取歌词
    lyric(id) {
        return fly.get(`/lyric?id=${id}`)
    },
    //获取歌曲详情
    getSongdetail(id) {
        return fly.get(`/song/detail?ids=${id}`)
    },
    //关键字搜索
    // limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 
    // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    keywordSearch(keyword) {
        return fly.get(`/search?keywords=${keyword}`)
    },
    // 搜索联想词
    searchSuggest(keywords) {
        return fly.get(`/search/suggest?keywords=${keywords}&type=mobile`)
    },
    //搜索多重匹配
    multimatch(keyword) {
        return fly.get(`/search/multimatch?keywords=${keyword}`)
    },
    // 综合搜索
    keywordSearches(keyword, type, limits) {
        return fly.get(`/search?keywords=${keyword}&type=${type}&limit=${limits}`)
    },
    //默认搜索关键词
    defaultKeyword() {
        return fly.get(`/search/default`)
    },
    //热搜列表(详细)
    hotSearchList() {
        return fly.get(`/search/hot/detail`)
    },

    // 歌手路由相关接口

    //歌手分类列表
    // limit为上拉加载时所需要数据
    // cat : 即 category Code,歌手类型,默认 1001,返回华语男歌手数据
    // initial: 按首字母索引查找参数
    artist(limit, Code, initial) {
        return fly.get(`/artist/list?limit=${limit}&cat=${Code}&initial=${initial}`)
    },
    //获取歌手歌曲和歌手信息
    getSong(id) {
        return fly.get(`/artists?id=${id}`)
    },
    //获取歌手专辑 
    getAlbum(id, offset) {
        return fly.get(`/artist/album?id=${id}&offset=${offset}`)
    },
    //获取歌手视频
    getMv(id) {
        return fly.get(`/artist/mv?id=${id}`)
    },
    // 播放次数的计算方法
    playCounts(items) {
        if (items >= 100000000) {
            let one = (items / 100000000).toFixed(2)
            return items = `${one}亿`
        } else if (items < 100000000 && items >= 10000) {
            let one = parseInt(items / 10000)
            return items = `${one}万`
        } else {
            return items = `${items}`
        }
    },
})